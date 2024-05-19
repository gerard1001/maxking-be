import { Module, forwardRef } from '@nestjs/common';
import { UserCourseService } from './user_course.service';
import { UserCourseController } from './user_course.controller';
import { UserCourseRepository } from './providers/user_course.repository';
import { userCourseProviders } from 'src/database/providers/entities.providers';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { AuthModule } from '../auth/auth.module';
import { ModuleModule } from '../module/module.module';
import { UserModuleModule } from '../user_module/user_module.module';
import { CommentModule } from '../comment/comment.module';
import { ArticleModule } from '../article/article.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CourseModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ModuleModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
    forwardRef(() => UserModuleModule),
  ],
  controllers: [UserCourseController],
  providers: [UserCourseService, UserCourseRepository, ...userCourseProviders],
  exports: [UserCourseService, UserCourseRepository, ...userCourseProviders],
})
export class UserCourseModule {}
