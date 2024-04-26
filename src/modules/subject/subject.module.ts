import { Module, forwardRef } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SubjectRepository } from './providers/subject.repository';
import { subjectProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, ...subjectProviders],
  exports: [SubjectService, SubjectRepository, ...subjectProviders],
})
export class SubjectModule {}
