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
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IResponse<User>> {
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
    const subject = 'MaxKing Account Confirmation';
    const text = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Max King Institute</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Source Sans 3", sans-serif;
      }
    </style>
  </head>
  <body>
    <div
      style="
        background-color: rgba(241, 241, 241, 0);
        border-radius: 10px;
        width: fit-content;
        margin: auto;
        padding: 10px 20px 20px 20px;
        max-width: 440px;
        width: 640px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        justify-items: center;
        font-optical-sizing: auto;
        font-style: normal;
      "
    >
      <img
        src="https://res.cloudinary.com/rutagerard/image/upload/v1712586592/Important/logo_krcqtj.png"
        alt=""
        style="width: 100px; aspect-ratio: 1/1"
      />
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-items: center;
          background-color: #a65309;
          color: white;
          padding: 20px;
          border-radius: 10px;
        "
      >
        <h1 style="font-size: 24px; text-align: center">
          Thanks for joining Max King's Institute
        </h1>
        <p style="text-align: center">
          We sent this email to confirm your account creation on Max King's app,
          and to confirm the email address you provided
        </p>
        <p style="font-size: 14px; color: #e7e7e7">
          Click the button below to confirm and proceed with login
        </p>
        <a href="http://localhost:3000/?token=${token}">
          <button
            style="
              background-color: #f9a826;
              color: white;
              border: none;
              border-radius: 5px;
              padding: 10px 20px;
              font-size: 14px;
              cursor: pointer;
              text-transform: uppercase;
            "
          >
            Confirm Account
          </button></a
        >
        <br />
        <hr style="width: 100%" />
        <p style="font-size: 14px; color: #e7e7e7">
          If you did not create an account on Max King's app, no further action
          is required
        </p>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          gap: 2px;
          align-items: center;
          justify-items: center;
          padding-top: 20px;
        "
      >
        <a
          href="https://twitter.com/maxkinginstitut"
          target="_blank"
          style="
            display: flex;
            flex-direction: column;
            padding: 10px;
            align-items: center;
            justify-items: center;
            border-radius: 50%;
            background-color: #242e8f;
          "
        >
          <img
            src="https://res.cloudinary.com/rutagerard/image/upload/v1712589344/X-Logo_mjray4.png"
            alt=""
            style="width: 18px; aspect-ratio: 1/1; filter: invert(1)"
          />
        </a>
      </div>
    </div>
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

    await this.userRoleService.create({
      userId: newUser.id,
      roleId: role.id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: newUser,
    };
  }

  async login(loginAuthDto: LoginAuthDto): Promise<IResponse<IToken>> {
    try {
      const { email, password } = loginAuthDto;
      const user = await this.userRepo.findByEmail(email);
      console.log(user);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
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

  // async googleLogin(data: any): Promise<any> {
  //   try {
  //     const user = await this.userRepo.findByEmail(data.email);

  //     if (!user) {
  //       console.log('User not found, creating user');
  //       const role = await this.roleRepo.findByType('CLIENT');
  //       if (!role) {
  //         throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
  //       }
  //       const newUser = await this.userRepo.register({
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         email: data.email,
  //         password: null,
  //         isVerified: data.isVerified,
  //       });
  //       const token = await this.authHelper.generateJwtToken({
  //         id: newUser.id,
  //       });

  //       await this.userRoleService.create({
  //         userId: newUser.id,
  //         roleId: role.id,
  //       });

  //       console.log('User created successfully');
  //       console.log('Token:', token);
  //       console.log('User:', newUser);

  //       /* return {
  //         statusCode: HttpStatus.CREATED,
  //         message: 'User registered successfully (With Google)',
  //         data: {
  //           token,
  //         },
  //       }; */

  //       return newUser;
  //     }

  //     const token = await this.authHelper.generateJwtToken({
  //       id: user.id,
  //     });
  //     console.log('User logged in successfully');
  //     console.log('Token:', token);
  //     console.log('User:', user);

  //     return user;

  //     /* return {
  //       statusCode: HttpStatus.OK,
  //       message: 'User logged in successfully (With Google)',
  //       data: {
  //         token,
  //       },
  //     }; */
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Server Error',
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async googleLogin(req: any, res: any): Promise<IResponse<IToken>> {
    try {
      console.log('***********$$$$$$************');
      console.log(req.user);

      const { firstName, lastName, email, picture, isVerified } = req.user;

      const user = await this.userRepo.findByEmail(req.user?.email);

      if (!user) {
        console.log('User not found, creating user');
        console.log('Create user:', req.user.firstName);

        const role = await this.roleRepo.findByType('CLIENT');
        if (!role) {
          throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }
        const newUser = await this.userRepo.register({
          firstName,
          lastName,
          email,
          password: null,
          isVerified,
        });
        // await this.profileRepo.create({
        //   userId: newUser.id,
        //   picture,
        // });
        const token = await this.authHelper.generateJwtToken({
          id: newUser.id,
        });

        await this.userRoleService.create({
          userId: newUser.id,
          roleId: role.id,
        });

        console.log('User created successfully');
        console.log('Token:', token);
        console.log('User:', newUser);

        return {
          statusCode: HttpStatus.CREATED,
          message: 'User registered successfully (With Google)',
          data: {
            token,
          },
        };
      }

      const token = await this.authHelper.generateJwtToken({
        id: user.id,
      });
      console.log('User logged in successfully');
      console.log('Token:', token);
      console.log('User:', user);

      await res.redirect(`http://localhost:3000`);
      return {
        statusCode: HttpStatus.OK,
        message: 'User logged in successfully (With Google)',
        data: {
          token,
        },
      };
    } catch (error) {
      console.log('+++++++++++');
      console.log(error);
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
