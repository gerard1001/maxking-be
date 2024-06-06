import { IsDefined, IsString } from 'class-validator';

export class CreateUserCertificateDto {
  @IsString()
  @IsDefined()
  readonly userId: string;

  @IsString()
  @IsDefined()
  readonly certificateId: string;

  @IsString()
  @IsDefined()
  readonly userCertificateId: string;
}
