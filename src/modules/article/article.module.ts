import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { articleProviders } from 'src/database/providers/entities.providers';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ...articleProviders],
  exports: [ArticleService, ...articleProviders],
})
export class ArticleModule {}
