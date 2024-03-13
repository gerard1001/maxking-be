import { Module } from '@nestjs/common';
import { ArticleTagService } from './article_tag.service';
import { ArticleTagController } from './article_tag.controller';
import { ArticleTagRepository } from './providers/article_tag.repository';
import { articleTagProviders } from 'src/database/providers/entities.providers';

@Module({
  controllers: [ArticleTagController],
  providers: [ArticleTagService, ArticleTagRepository, ...articleTagProviders],
  exports: [ArticleTagService, ArticleTagRepository, ...articleTagProviders],
})
export class ArticleTagModule {}
