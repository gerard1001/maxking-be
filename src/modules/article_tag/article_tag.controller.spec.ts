import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagController } from './article_tag.controller';
import { ArticleTagService } from './article_tag.service';

describe('ArticleTagController', () => {
  let controller: ArticleTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleTagController],
      providers: [ArticleTagService],
    }).compile();

    controller = module.get<ArticleTagController>(ArticleTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
