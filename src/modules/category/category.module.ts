import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './providers/category.repository';
import { categoryProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { UserModule } from '../user/user.module';
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
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, ...categoryProviders],
  exports: [CategoryService, CategoryRepository, ...categoryProviders],
})
export class CategoryModule {}
