import { PartialType } from '@nestjs/mapped-types';
import { CreateUserArticleDto } from './create-user_article.dto';

export class UpdateUserArticleDto extends PartialType(CreateUserArticleDto) {}
