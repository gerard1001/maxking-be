import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ArticleModule } from '../article/article.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CommentRepository } from './providers/comment.repository';
import { commentProviders } from 'src/database/providers/entities.providers';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [
    forwardRef(() => ArticleModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, ...commentProviders],
  exports: [CommentService, CommentRepository, ...commentProviders],
})
export class CommentModule {}
