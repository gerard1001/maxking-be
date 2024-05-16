import { Module, forwardRef } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { CommentModule } from '../comment/comment.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { LikeRepository } from './providers/like.repository';
import { likeProviders } from 'src/database/providers/entities.providers';
import { ArticleModule } from '../article/article.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, ...likeProviders],
  exports: [LikeService, LikeRepository, ...likeProviders],
})
export class LikeModule {}
