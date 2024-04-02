import { IsDefined, IsNotEmpty, IsArray } from 'class-validator';

export class DeleteArticlesDto {
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  readonly ids: string[];
}
