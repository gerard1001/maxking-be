import { Module, forwardRef } from '@nestjs/common';
import { CertificateController } from './certificate.controller';
import { certificateProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { CertificateService } from './certificate.service';
import { CertificateRepository } from './providers/certificate.repository';
import { CourseModule } from '../course/course.module';
import { CloudinaryModule } from 'src/core/upload/cloudinary/cloudinary.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
    forwardRef(() => CourseModule),
    forwardRef(() => CloudinaryModule),
  ],
  controllers: [CertificateController],
  providers: [
    CertificateService,
    CertificateRepository,
    ...certificateProviders,
  ],
  exports: [CertificateService, CertificateRepository, ...certificateProviders],
})
export class CertificateModule {}
