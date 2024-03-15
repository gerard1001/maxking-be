import { IsDefined, IsString } from 'class-validator';

export class CreateUserArticleDto {
  @IsString()
  @IsDefined()
  readonly userId: string;

  @IsString()
  @IsDefined()
  readonly articleId: string;
}
