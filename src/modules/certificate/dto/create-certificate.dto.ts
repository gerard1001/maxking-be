import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  // IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Issuer } from 'src/core/interfaces/response.interface';

export class CreateCertificateDto {
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  readonly issuers: Issuer;

  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  // readonly issuerName1: string;

  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  // readonly issuerSignature1?: string;

  // @IsString()
  // @IsDefined()
  // @IsNotEmpty()
  // @Type(() => String)
  // readonly issuerPosition1: string;

  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // @Type(() => String)
  // readonly issuerName2?: string;

  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // @Type(() => String)
  // readonly issuerSignature2?: string;

  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // @Type(() => String)
  // readonly issuerPosition2?: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  readonly courseId?: string;
}
