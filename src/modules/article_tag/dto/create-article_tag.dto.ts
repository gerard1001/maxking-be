import { IsDefined, IsString } from 'class-validator';

export class CreateArticleTagDto {
  @IsString()
  @IsDefined()
  readonly articleId: string;

  @IsString()
  @IsDefined()
  readonly tagId: string;
}
