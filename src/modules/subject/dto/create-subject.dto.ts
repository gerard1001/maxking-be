import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
}
