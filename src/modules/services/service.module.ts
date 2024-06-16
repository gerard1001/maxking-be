import { Module, forwardRef } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { serviceProviders } from 'src/database/providers/entities.providers';
import { CloudinaryModule } from 'src/core/upload/cloudinary/cloudinary.module';
import { ServiceRepository } from './providers/service.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { CourseModule } from '../course/course.module';
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
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository, ...serviceProviders],
  exports: [ServiceService, ServiceRepository, ...serviceProviders],
})
export class ServiceModule {}
