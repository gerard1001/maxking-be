import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}
