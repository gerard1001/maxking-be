import { Test, TestingModule } from '@nestjs/testing';
import { UserArticleController } from './user_article.controller';
import { UserArticleService } from './user_article.service';

describe('UserArticleController', () => {
  let controller: UserArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserArticleController],
      providers: [UserArticleService],
    }).compile();

    controller = module.get<UserArticleController>(UserArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
