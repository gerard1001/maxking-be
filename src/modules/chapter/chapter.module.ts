import { Module, forwardRef } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { ChapterRepository } from './providers/chapter.repository';
import { chapterProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { UserModule } from '../user/user.module';
import { ModuleModule } from '../module/module.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => ModuleModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository, ...chapterProviders],
  exports: [ChapterService, ChapterRepository, ...chapterProviders],
})
export class ChapterModule {}
