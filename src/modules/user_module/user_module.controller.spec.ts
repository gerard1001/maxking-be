import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagController } from './user_module.controller';
import { ArticleTagService } from './user_module.service';

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
