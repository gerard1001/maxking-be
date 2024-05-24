import { Module, forwardRef } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { documentProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { DocumentService } from './document.service';
import { DocumentRepository } from './providers/document.repository';
import { CloudinaryModule } from 'src/core/upload/cloudinary/cloudinary.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
    forwardRef(() => CloudinaryModule),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository, ...documentProviders],
  exports: [DocumentService, DocumentRepository, ...documentProviders],
})
export class DocumentModule {}
