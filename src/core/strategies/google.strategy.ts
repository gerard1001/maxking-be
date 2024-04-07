import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VerifiedCallback } from 'passport-jwt';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(public readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('CLIENT_ID'),
      clientSecret: configService.get<string>('CLIENT_SECRET'),
      callbackURL: configService.get<string>('CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    cb: VerifiedCallback,
  ) {
    console.log(_accessToken);
    console.log(_refreshToken);
    console.log(profile);

    // const { name, emails, photos } = profile;

    // const user = await this.authService.googleLogin({
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    //   picture: photos[0].value,
    //   isVerified: emails[0].verified,
    // });

    // console.log('Validate**');
    // console.log(user);

    // return user || null;

    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      isVerified: emails[0].verified,
    };
    cb(null, user);
  }
}
