import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './providers/service.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';
import { Service } from './model/service.model';

@Injectable()
export class ServiceService {
  constructor(
    private readonly serviceRepo: ServiceRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Service>> {
    try {
      const { title, description, body } = createServiceDto;
      const serviceExists = await this.serviceRepo.findByTitle(title.trim());
      if (serviceExists) {
        throw new HttpException(
          'This service title already exists',
          HttpStatus.CONFLICT,
        );
      }

      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const newService = await this.serviceRepo.create({
        title: title.trim(),
        description,
        body,
        coverImage: req['file'] && file?.secure_url,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: `Service created successfully`,
        data: newService,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Service[]>> {
    try {
      const services = await this.serviceRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Services retrieved successfully',
        data: services,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<IResponse<Service>> {
    try {
      const service = await this.serviceRepo.findById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Service retrieved successfully',
        data: service,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Service>> {
    try {
      const service = await this.serviceRepo.findById(id);
      if (!service) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }

      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      const newService = await this.serviceRepo.update(id, {
        ...updateServiceDto,
        coverImage: req['file'] ? file?.secure_url : service.coverImage,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Updated service successfuly',
        data: newService[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const count = await this.serviceRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Service deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
