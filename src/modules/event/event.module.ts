import { Module, forwardRef } from '@nestjs/common';
import { EventController } from './event.controller';
import { eventProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { EventService } from './event.service';
import { EventRepository } from './providers/event.repository';
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
  controllers: [EventController],
  providers: [EventService, EventRepository, ...eventProviders],
  exports: [EventService, EventRepository, ...eventProviders],
})
export class EventModule {}
