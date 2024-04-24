import { Module, forwardRef } from '@nestjs/common';
import { UserArticleService } from './user_article.service';
import { UserArticleController } from './user_article.controller';
import { userArticleProviders } from 'src/database/providers/entities.providers';
import { UserArticleRepository } from './providers/user_article.repository';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { AuthModule } from '../auth/auth.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [UserArticleController],
  providers: [
    UserArticleService,
    UserArticleRepository,
    ...userArticleProviders,
  ],
  exports: [UserArticleService, UserArticleRepository, ...userArticleProviders],
})
export class UserArticleModule {}
