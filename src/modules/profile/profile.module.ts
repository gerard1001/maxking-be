import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';
import { ProfileRepository } from './providers/profile.repository';
import { profileProviders } from 'src/database/providers/entities.providers';
import { CloudinaryModule } from 'src/core/upload/cloudinary/cloudinary.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CloudinaryModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, ...profileProviders],
  exports: [ProfileService, ProfileRepository, ...profileProviders],
})
export class ProfileModule {}
