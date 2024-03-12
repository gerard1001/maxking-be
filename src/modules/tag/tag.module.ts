import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './providers/tag.repository';
import { tagProviders } from 'src/database/providers/entities.providers';

@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository, ...tagProviders],
  exports: [TagService, TagRepository, ...tagProviders],
})
export class TagModule {}
