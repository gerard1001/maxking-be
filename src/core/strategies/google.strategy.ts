import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VerifiedCallback } from 'passport-jwt';
import { UserRepository } from 'src/modules/user/providers/user.repository';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    public readonly configService: ConfigService,
    private readonly userRepo: UserRepository,
  ) {
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
    // const emailUser = await this.userRepo.findByEmail(profile.emails[0].value);
    // if (emailUser.password !== null) {
    //   throw new HttpException(
    //     'This email was registered manually, please proceed with email and password',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

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
