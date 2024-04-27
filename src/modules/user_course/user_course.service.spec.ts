import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagService } from './user_course.service';

describe('ArticleTagService', () => {
  let service: ArticleTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleTagService],
    }).compile();

    service = module.get<ArticleTagService>(ArticleTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
