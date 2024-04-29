import { IsDefined, IsEnum, IsString } from 'class-validator';

export class CreateUserModuleDto {
  @IsString()
  @IsDefined()
  readonly userId: string;

  @IsString()
  @IsDefined()
  readonly moduleId: string;

  @IsString()
  @IsDefined()
  readonly rank?: string;
}
