import { Test, TestingModule } from '@nestjs/testing';
import { UserCertificateService } from './user_certificate.service';

describe('UserCertificateService', () => {
  let service: UserCertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCertificateService],
    }).compile();

    service = module.get<UserCertificateService>(UserCertificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
