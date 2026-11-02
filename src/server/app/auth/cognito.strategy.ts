import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

import { UsersService } from '../users/users.service.js';
import { oauthState } from './oauth-state.js';

type UserInfo = {
  sub: string;
  username: string;
  name?: string;
  email?: string;
};

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
      store: oauthState(config),
      pkce: true,
    });
    this.oauth2Url = oauth2Url;
  }

  // passport-oauth2 hands over only the access token, so the profile is fetched separately.
  async validate(accessToken: string) {
    const response = await fetch(`${this.oauth2Url}/userInfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new UnauthorizedException();
    const info = (await response.json()) as UserInfo;

    // Usernames can be chosen at sign-up; only `sub` identifies a Cognito user.
    return this.users.findOrCreate({
      provider: 'cognito',
      providerId: info.sub,
      name: info.name,
      username: info.email ?? info.username,
    });
  }
}
