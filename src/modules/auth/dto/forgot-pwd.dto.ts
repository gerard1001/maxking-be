import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}

export class ChangePasswordDto {
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}
