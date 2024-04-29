import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './providers/course.repository';
import { courseProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { UserModule } from '../user/user.module';
import { SubjectModule } from '../subject/subject.module';
import { UserCourseModule } from '../user_course/user_course.module';
import { CloudinaryModule } from 'src/core/upload/cloudinary/cloudinary.module';
import { TagModule } from '../tag/tag.module';
import { CourseTagModule } from '../course_tag/course_tag.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => SubjectModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
    forwardRef(() => TagModule),
    forwardRef(() => CourseTagModule),
    forwardRef(() => UserCourseModule),
    forwardRef(() => CloudinaryModule),
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, ...courseProviders],
  exports: [CourseService, CourseRepository, ...courseProviders],
})
export class CourseModule {}
