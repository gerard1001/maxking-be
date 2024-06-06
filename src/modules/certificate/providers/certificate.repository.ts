import { Inject, Injectable } from '@nestjs/common';
import { CERTIFICATE_MODEL } from 'src/core/constants';
import { Certificate } from '../model/certificate.model';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { UpdateCertificateDto } from '../dto/update-certificate.dto';

@Injectable()
export class CertificateRepository {
  constructor(
    @Inject(CERTIFICATE_MODEL)
    private readonly certificateModel: typeof Certificate,
  ) {}

  async create(createCertificateDto: any): Promise<Certificate> {
    return await this.certificateModel.create(createCertificateDto);
  }

  async findAll(): Promise<Certificate[]> {
    return await this.certificateModel.findAll();
  }

  async findById(id: string) {
    return await this.certificateModel.findByPk(id);
  }

  async findByCourseId(courseId: string): Promise<Certificate[]> {
    return await this.certificateModel.findAll({ where: { courseId } });
  }

  async update(
    id: string,
    updateCertificateDto: any,
  ): Promise<[number, Certificate[]]> {
    return await this.certificateModel.update(updateCertificateDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.certificateModel.destroy({ where: { id } });
  }
}
