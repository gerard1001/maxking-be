import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly text: string;
}
