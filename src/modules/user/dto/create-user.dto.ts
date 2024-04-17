import {
  IsString,
  IsEmail,
  IsDefined,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsUUID,
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
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  readonly roleId?: string;

  @IsBoolean()
  @IsOptional()
  readonly isVerified: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isGoogleUser?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly publicDisplay?: boolean;
}
