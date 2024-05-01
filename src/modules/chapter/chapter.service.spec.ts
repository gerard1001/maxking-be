import { Test, TestingChapter } from '@nestjs/testing';
import { ChapterService } from './chapter.service';

describe('ChapterService', () => {
  let service: ChapterService;

  beforeEach(async () => {
    const chapter: TestingChapter = await Test.createTestingChapter({
      providers: [ChapterService],
    }).compile();

    service = chapter.get<ChapterService>(ChapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
