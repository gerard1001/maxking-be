import { Module, forwardRef } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './providers/question.repository';
import { questionProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { ModuleModule } from '../module/module.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CourseModule),
    forwardRef(() => ModuleModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, ...questionProviders],
  exports: [QuestionService, QuestionRepository, ...questionProviders],
})
export class QuestionModule {}
