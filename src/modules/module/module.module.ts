import { Module, forwardRef } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { ModuleRepository } from './providers/module.repository';
import { moduleProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';
import { ReplyModule } from '../reply/reply.module';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CourseModule),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [ModuleController],
  providers: [ModuleService, ModuleRepository, ...moduleProviders],
  exports: [ModuleService, ModuleRepository, ...moduleProviders],
})
export class ModuleModule {}
