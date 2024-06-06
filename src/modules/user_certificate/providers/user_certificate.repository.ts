import { Inject, Injectable } from '@nestjs/common';
import { USER_CERTIFICATE_MODEL } from 'src/core/constants';
import { UserCertificate } from '../model/user_certificate.model';
import { CreateUserCertificateDto } from '../dto/create-user_certificate.dto';

@Injectable()
export class UserCertificateRepository {
  constructor(
    @Inject(USER_CERTIFICATE_MODEL)
    private readonly userCertificateModel: typeof UserCertificate,
  ) {}

  async create(
    createUserCertificateDto: CreateUserCertificateDto,
  ): Promise<UserCertificate> {
    return await this.userCertificateModel.create(createUserCertificateDto);
  }

  async findAll(): Promise<UserCertificate[]> {
    return await this.userCertificateModel.findAll();
  }

  async findById(id: string): Promise<UserCertificate> {
    return await this.userCertificateModel.findByPk(id);
  }

  async findByUserIdAndCertificateId(
    userId: string,
    certificateId: string,
  ): Promise<UserCertificate> {
    return await this.userCertificateModel.findOne({
      where: { userId, certificateId },
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.userCertificateModel.destroy({ where: { id } });
  }

  async deleteByUserAndCertificate(
    userId: string,
    certificateId: string,
  ): Promise<number> {
    return await this.userCertificateModel.destroy({
      where: { userId, certificateId },
    });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.userCertificateModel.destroy({ where: { id: ids } });
  }
}
