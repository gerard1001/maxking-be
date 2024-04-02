import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly text: string;
}
