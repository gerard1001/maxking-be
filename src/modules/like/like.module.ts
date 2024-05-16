import { Module, forwardRef } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { CommentModule } from '../comment/comment.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { LikeRepository } from './providers/like.repository';
import { likeProviders } from 'src/database/providers/entities.providers';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    forwardRef(() => CommentModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, ...likeProviders],
  exports: [LikeService, LikeRepository, ...likeProviders],
})
export class LikeModule {}
