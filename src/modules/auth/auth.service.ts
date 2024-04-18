import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/providers/user.repository';
import { PasswordHelper } from 'src/core/helpers/password.helper';
import { UserRoleService } from '../user_role/user_role.service';
import { RoleRepository } from '../role/providers/role.repository';
import { IResponse, IToken } from 'src/core/interfaces/response.interface';
import { AuthHelper } from 'src/core/helpers/auth.helper';
import { User } from '../user/model/user.model';
import { ProfileRepository } from '../profile/providers/profile.repository';
import { MailerHelper } from 'src/core/helpers/mailer.helper';
import { ConfigService } from '@nestjs/config';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly userRoleService: UserRoleService,
    private readonly passwordHelper: PasswordHelper,
    private readonly authHelper: AuthHelper,
    private readonly mailerHelper: MailerHelper,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IResponse<User>> {
    try {
      const { firstName, lastName, email, password } = createUserDto;
      const user = await this.userRepo.findByEmail(email);
      if (user) {
        throw new HttpException(
          `User: ${email} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const role = await this.roleRepo.findByType('CLIENT');
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      const token = await this.authHelper.generateJwtToken<{ email: string }>({
        email,
      });
      const frontendUrl = this.configService.get('FRONTEND_URL');
      const subject = 'MaxKing Account Confirmation';
      const text = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Email Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 400;
          src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
              format("woff");
        }
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 700;
          src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
              format("woff");
        }
      }
     
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%; 
      }
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
    </style>
  </head>
  <body style="background-color: #e9ecef">
    <div
      class="preheader"
      style="
        display: none;
        max-width: 0;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        line-height: 1px;
        color: #fff;
        opacity: 0;
      "
    >
      Hi ${lastName}, thanks for registering to Max King.
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td align="center" valign="top" style="padding: 36px 24px 0px">
                <a
                  href="${frontendUrl}"
                  target="_blank"
                  style="display: inline-block"
                >
                  <img
                    src="https://res.cloudinary.com/rutagerard/image/upload/v1712586592/Important/logo_krcqtj.png"
                    alt="Logo"
                    border="0"
                    width="100"
                    style="
                      display: block;
                      width: 80px;
                      max-width: 80px;
                      min-width: 80px;
                    "
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 36px 24px 0;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  border-top: 3px solid #242e8f;
                "
              >
                <h1
                  style="
                    margin: 0;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    line-height: 48px;
                    text-align: center;
                  "
                >
                  Confirm Your Email Address
                </h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  padding-bottom: 0px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                "
              >
                <p style="text-align: center">
                  We sent this email to confirm your account creation on Max
                  King's app, and to confirm the email address you provided
                </p>
                <p style="font-size: 14px; text-align: center">
                  Click the button below to confirm and proceed with login
                </p>
              </td>
            </tr>
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 12px">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td
                            align="center"
                            bgcolor="#a65309"
                            style="border-radius: 6px"
                          >
                            <a
                              href="${frontendUrl}/verify?token=${token}"
                              target="_blank"
                              style="
                                display: inline-block;
                                padding: 16px 36px;
                                font-family: 'Source Sans Pro', Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 6px;
                              "
                            >
                              Confirm Account</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                  border-bottom: 3px solid #242e8f;
                "
              >
                <p style="margin: 0">
                  If you are having trouble with the button above, use the link below:
                </p>
                <p style="margin: 0">
                  <a href="${frontendUrl}/?token=${token}" target="_blank"
                    >${frontendUrl}</a
                  >
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#e9ecef" style="padding: 24px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                bgcolor="#e9ecef"
                style="
                  padding: 12px 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  line-height: 20px;
                  color: #666;
                "
              >
                <p style="margin: 0">
                  You received this email because you created an account on Max King. Please ignore it if you did not do this action.
                </p>
              </td>
            </tr>
            <tr>
              <td
                align="center"
                bgcolor="#e9ecef"
                style="
                  padding: 12px 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  line-height: 20px;
                  color: #666;
                "
              >
                <p style="margin: 0">
                  To stop receiving these emails, press:
                  <a href="${frontendUrl}" target="_blank"
                  >unsubscribe</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
              align="center"
              bgcolor="#e9ecef"
              >
                <a
          href="https://twitter.com/maxkinginstitut"
          target="_blank"
          style="
            display: flex;
            flex-direction: column;
            padding: 6px;
            align-items: center;
            justify-items: center;
            border-radius: 50%;
            background-color: #242e8f;
            width: 14px;
            height: 14px;
          "
        >
           <img
            src="https://res.cloudinary.com/rutagerard/image/upload/v1712658322/Important/1690643777twitter-x_logo-png-white_ivtglr.png"
            alt=""
            style="width: 100%; height: 100%"
          />
        </a></td>
            </tr>
          </table>
        </td>
      </tr>
  </body>
</html>
`;
      try {
        await this.mailerHelper.sendEmail(email, subject, text);
      } catch (error) {
        throw new HttpException(
          'Email delivery has failed, please check again your email address or try again later',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = await this.userRepo.register({
        firstName,
        lastName,
        email,
        password: await this.passwordHelper.hashPassword(password),
        isVerified: false,
      });

      try {
        await this.profileRepo.create({
          userId: newUser.id,
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1710712498/brand/elh13kdsiqvo8dvjyh0a.jpg',
        });
      } catch (error) {
        await this.userRepo.deleteByEmail(email);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user profile, try again',
        };
      }

      await this.userRoleService.create({
        userId: newUser.id,
        roleId: role.id,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Account created successfully, Check your inbox to confirm',
        data: newUser,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<IResponse<User>> {
    try {
      const { firstName, lastName, email, roleId } = createUserDto;
      const password = 'Maxking1001';
      const user = await this.userRepo.findByEmail(email);
      if (user) {
        throw new HttpException(
          `User: ${email} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const role = await this.roleRepo.findById(roleId);
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      const newUser = await this.userRepo.register({
        firstName,
        lastName,
        email,
        password: await this.passwordHelper.hashPassword(password),
        isVerified: true,
      });

      try {
        await this.profileRepo.create({
          userId: newUser.id,
          picture:
            'https://res.cloudinary.com/rutagerard/image/upload/v1710712498/brand/elh13kdsiqvo8dvjyh0a.jpg',
        });
      } catch (error) {
        await this.userRepo.deleteByEmail(email);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user profile, try again',
        };
      }

      try {
        await this.userRoleService.create({
          userId: newUser.id,
          roleId: role.id,
        });
      } catch (error) {
        await this.userRepo.deleteByEmail(email);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user role relation, try again',
        };
      }

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyEmail(req: any): Promise<IResponse<any>> {
    try {
      const token = req.params.token;
      const decodedToken = await this.authHelper.decodeJwtToken(token);
      if (!decodedToken) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      const user = await this.userRepo.findByEmail(decodedToken.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (user.isVerified === true) {
        throw new HttpException('User already verified', HttpStatus.CONFLICT);
      }
      const newUser = await this.userRepo.update(user.id, {
        isVerified: true,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User verified successfully',
        data: newUser[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<IResponse<IToken>> {
    try {
      const { email, password } = loginAuthDto;
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      if (user.isGoogleUser) {
        throw new HttpException(
          'User not registered with email and password, please proceed with google sign in',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isCorrectPassword = await this.passwordHelper.comparePassword(
        password,
        user.password,
      );
      if (!isCorrectPassword) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      if (user.isVerified === false) {
        throw new HttpException('User not verified', HttpStatus.UNAUTHORIZED);
      }
      const token = await this.authHelper.generateJwtToken<{
        id: string;
      }>({
        id: user.id,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User logged in successfully',
        data: {
          token,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async googleLogin(req: any, res: any) {
    const params = new URLSearchParams();
    const { firstName, lastName, email, picture, isVerified } = req.user;
    const frontendUrl = this.configService.get('FRONTEND_URL');
    try {
      const user = await this.userRepo.findByEmail(req.user?.email);

      if (!user) {
        const role = await this.roleRepo.findByType('CLIENT');
        if (!role) {
          params.set('error', 'role_not_found');
        }

        const newUser = await this.userRepo.register({
          firstName,
          lastName,
          email,
          password: null,
          isVerified,
          isGoogleUser: true,
        });
        const token = await this.authHelper.generateJwtToken({
          id: newUser.id,
        });

        try {
          await this.userRoleService.create({
            userId: newUser.id,
            roleId: role.id,
          });
        } catch (error) {
          params.set('error', 'role_assignment_failed');
          await this.userRepo.deleteOne(newUser.id);
        }

        try {
          await this.profileRepo.create({
            userId: newUser.id,
            picture,
          });
        } catch (error) {
          params.set('error', 'profile_creation_failed');
        }

        params.set('token', token);
        params.set('new_user', 'true');

        return res.redirect(`${frontendUrl}?${params}`);
      }

      const token = await this.authHelper.generateJwtToken({
        id: user.id,
      });

      if (!user.isGoogleUser) {
        params.set('error', 'manual_user_google_signin_conflict');
      } else {
        params.set('token', token);
        params.set('new_user', 'false');
      }

      return res.redirect(`${frontendUrl}?${params}`);
    } catch (error) {
      await this.userRepo.deleteByEmail(req?.user?.email);
      params.set('error', 'server_error');
      return res.redirect(`${frontendUrl}?${params}`);
    }
  }
}
