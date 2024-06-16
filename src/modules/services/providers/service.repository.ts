import { Inject, Injectable } from '@nestjs/common';
import { SERVICE_MODEL } from 'src/core/constants';
import { Service } from '../model/service.model';
import { CreateServiceDto } from '../dto/create-service.dto';

@Injectable()
export class ServiceRepository {
  constructor(
    @Inject(SERVICE_MODEL) private readonly serviceModel: typeof Service,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceModel.create(createServiceDto);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceModel.findAll({});
  }

  async findById(id: string) {
    return await this.serviceModel.findByPk(id);
  }

  async findByTitle(title: string) {
    return await this.serviceModel.findOne({ where: { title } });
  }

  async update(
    id: string,
    updateServiceDto: any,
  ): Promise<[number, Service[]]> {
    return await this.serviceModel.update(updateServiceDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.serviceModel.destroy({ where: { id } });
  }
}
