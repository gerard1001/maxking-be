import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateUserModuleDto {
  @IsString()
  @IsDefined()
  readonly userId: string;

  @IsString()
  @IsDefined()
  readonly moduleId: string;

  @IsNumber()
  @IsDefined()
  readonly currentChapter?: number;

  @IsString()
  @IsDefined()
  readonly rank?: string;
}
