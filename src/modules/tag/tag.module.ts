import { Module, forwardRef } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './providers/tag.repository';
import { tagProviders } from 'src/database/providers/entities.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [TagController],
  providers: [TagService, TagRepository, ...tagProviders],
  exports: [TagService, TagRepository, ...tagProviders],
})
export class TagModule {}
