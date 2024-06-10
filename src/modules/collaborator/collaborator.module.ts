import { Module, forwardRef } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorRepository } from './providers/collaborator.repository';
import { collaboratorProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
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
  controllers: [CollaboratorController],
  providers: [
    CollaboratorService,
    CollaboratorRepository,
    ...collaboratorProviders,
  ],
  exports: [
    CollaboratorService,
    CollaboratorRepository,
    ...collaboratorProviders,
  ],
})
export class CollaboratorModule {}
