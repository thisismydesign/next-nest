import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { UsersService } from '../users/users.service.js';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    config: ConfigService,
    private users: UsersService,
  ) {
    super({
      clientID: config.getOrThrow<string>('OAUTH_GOOGLE_ID'),
      clientSecret: config.getOrThrow<string>('OAUTH_GOOGLE_SECRET'),
      callbackURL: config.getOrThrow<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const where = { provider: 'google' as const, providerId: profile.id };
    return (
      (await this.users.findOne({ where })) ??
      this.users.create({
        ...where,
        name: profile.name?.givenName,
        username: profile.emails?.[0].value ?? profile.id,
      })
    );
  }
}
