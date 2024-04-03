import { Module, forwardRef } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './providers/tag.repository';
import { tagProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [TagController],
  providers: [TagService, TagRepository, ...tagProviders],
  exports: [TagService, TagRepository, ...tagProviders],
})
export class TagModule {}
