import { Module } from '@nestjs/common';
import { ArticleTagService } from './article_tag.service';
import { ArticleTagController } from './article_tag.controller';

@Module({
  controllers: [ArticleTagController],
  providers: [ArticleTagService],
})
export class ArticleTagModule {}
