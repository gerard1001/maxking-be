import { Module, forwardRef } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { articleProviders } from 'src/database/providers/entities.providers';
import { TagModule } from '../tag/tag.module';
import { ArticleTagModule } from '../article_tag/article_tag.module';
import { CloudinaryModule } from 'src/core/upload/cloudinary/cloudinary.module';
import { ArticleRepository } from './providers/article.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    forwardRef(() => TagModule),
    forwardRef(() => ArticleTagModule),
    forwardRef(() => CloudinaryModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => CommentModule),
    forwardRef(() => CourseModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, ...articleProviders],
  exports: [ArticleService, ArticleRepository, ...articleProviders],
})
export class ArticleModule {}
