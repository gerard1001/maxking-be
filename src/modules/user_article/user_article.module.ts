import { Module } from '@nestjs/common';
import { UserArticleService } from './user_article.service';
import { UserArticleController } from './user_article.controller';
import { userArticleProviders } from 'src/database/providers/entities.providers';

@Module({
  controllers: [UserArticleController],
  providers: [UserArticleService, ...userArticleProviders],
  exports: [UserArticleService, ...userArticleProviders],
})
export class UserArticleModule {}
