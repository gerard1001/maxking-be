import { Test, TestingModule } from '@nestjs/testing';
import { CourseTagController } from './course_tag.controller';
import { CourseTagService } from './course_tag.service';

describe('CourseTagController', () => {
  let controller: CourseTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseTagController],
      providers: [CourseTagService],
    }).compile();

    controller = module.get<CourseTagController>(CourseTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
