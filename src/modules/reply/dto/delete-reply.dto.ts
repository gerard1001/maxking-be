import { IsDefined, IsNotEmpty, IsArray } from 'class-validator';

export class DeleteRepliesDto {
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  readonly ids: string[];
}
