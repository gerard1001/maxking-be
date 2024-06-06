import { Test, TestingModule } from '@nestjs/testing';
import { UserCertificateController } from './user_certificate.controller';
import { UserCertificateService } from './user_certificate.service';

describe('UserCertificateController', () => {
  let controller: UserCertificateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCertificateController],
      providers: [UserCertificateService],
    }).compile();

    controller = module.get<UserCertificateController>(
      UserCertificateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
