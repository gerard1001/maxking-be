import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from 'src/database/providers/entities.providers';
import { RoleRepository } from './providers/role.repository';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { ReplyModule } from '../reply/reply.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule),
    forwardRef(() => ReplyModule),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, ...roleProviders],
  exports: [RoleService, RoleRepository, ...roleProviders],
})
export class RoleModule {}
