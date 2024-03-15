import { Module, forwardRef } from '@nestjs/common';
import { ArticleTagService } from './article_tag.service';
import { ArticleTagController } from './article_tag.controller';
import { ArticleTagRepository } from './providers/article_tag.repository';
import { articleTagProviders } from 'src/database/providers/entities.providers';
import { ArticleModule } from '../article/article.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [forwardRef(() => ArticleModule), forwardRef(() => TagModule)],
  controllers: [ArticleTagController],
  providers: [ArticleTagService, ArticleTagRepository, ...articleTagProviders],
  exports: [ArticleTagService, ArticleTagRepository, ...articleTagProviders],
})
export class ArticleTagModule {}
