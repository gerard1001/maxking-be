import { Module, forwardRef } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { CommentModule } from '../comment/comment.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ReplyRepository } from './providers/reply.repository';
import { replyProviders } from 'src/database/providers/entities.providers';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    forwardRef(() => CommentModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
  ],
  controllers: [ReplyController],
  providers: [ReplyService, ReplyRepository, ...replyProviders],
  exports: [ReplyService, ReplyRepository, ...replyProviders],
})
export class ReplyModule {}
