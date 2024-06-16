import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './program.controller';
import { ServiceService } from './program.service';

describe('ServiceController', () => {
  let controller: ServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [ServiceService],
    }).compile();

    controller = module.get<ServiceController>(ServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
