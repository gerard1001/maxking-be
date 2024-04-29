import { Module, forwardRef } from '@nestjs/common';
import { CourseTagService } from './course_tag.service';
import { CourseTagController } from './course_tag.controller';
import { CourseTagRepository } from './providers/course_tag.repository';
import { courseTagProviders } from 'src/database/providers/entities.providers';
import { CourseModule } from '../course/course.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [forwardRef(() => CourseModule), forwardRef(() => TagModule)],
  controllers: [CourseTagController],
  providers: [CourseTagService, CourseTagRepository, ...courseTagProviders],
  exports: [CourseTagService, CourseTagRepository, ...courseTagProviders],
})
export class CourseTagModule {}
