import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

import { Provider } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';

type UserInfo = { username: string; name?: string; email: string };

@Injectable()
export class CognitoStrategy extends PassportStrategy(Strategy, 'cognito') {
  private oauth2Url: string;

  constructor(
    config: ConfigService,
    private users: UsersService,
  ) {
    const domain = config.getOrThrow<string>('OAUTH_COGNITO_DOMAIN');
    const region = config.getOrThrow<string>('OAUTH_COGNITO_REGION');
    const oauth2Url = `https://${domain}.auth.${region}.amazoncognito.com/oauth2`;
    super({
      authorizationURL: `${oauth2Url}/authorize`,
      tokenURL: `${oauth2Url}/token`,
      clientID: config.getOrThrow<string>('OAUTH_COGNITO_ID'),
      clientSecret: config.getOrThrow<string>('OAUTH_COGNITO_SECRET'),
      callbackURL: config.getOrThrow<string>('OAUTH_COGNITO_REDIRECT_URL'),
    });
    this.oauth2Url = oauth2Url;
  }

  // passport-oauth2 hands over only the access token, so the profile is fetched separately.
  async validate(accessToken: string) {
    const response = await fetch(`${this.oauth2Url}/userInfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const info = (await response.json()) as UserInfo;

    // Federated identities are named "<provider>_<id>"; native ones have a bare id.
    const [provider, providerId] = info.username.includes('_')
      ? (info.username.split('_') as [Provider, string])
      : ['cognito' as const, info.username];
    const where = { provider, providerId };
    return (
      (await this.users.findOne({ where })) ??
      this.users.create({ ...where, name: info.name, username: info.email })
    );
  }
}
