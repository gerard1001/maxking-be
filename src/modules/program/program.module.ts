import { Module, forwardRef } from '@nestjs/common';
import { programProviders } from 'src/database/providers/entities.providers';
import { CloudinaryModule } from 'src/core/upload/cloudinary/cloudinary.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { CourseModule } from '../course/course.module';
import { ProgramController } from './program.controller';
import { ProgramRepository } from './providers/program.repository';
import { ProgramService } from './program.service';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    forwardRef(() => CloudinaryModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => CourseModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [ProgramController],
  providers: [ProgramService, ProgramRepository, ...programProviders],
  exports: [ProgramService, ProgramRepository, ...programProviders],
})
export class ProgramModule {}
