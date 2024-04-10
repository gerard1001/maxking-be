import {
  IsString,
  IsEmail,
  IsDefined,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;

  @IsBoolean()
  @IsOptional()
  readonly isVerified: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isGoogleUser?: boolean;
}
