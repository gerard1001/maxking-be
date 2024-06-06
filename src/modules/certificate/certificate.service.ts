import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
// import { CertificateRepository } from './providers/certificate.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Certificate } from './model/certificate.model';
import { UserRepository } from '../user/providers/user.repository';
import { CertificateRepository } from './providers/certificate.repository';
import { CourseRepository } from '../course/providers/course.repository';

@Injectable()
export class CertificateService {
  constructor(
    private readonly certificateRepo: CertificateRepository,
    private readonly userRepo: UserRepository,
    private readonly courseRepo: CourseRepository,
  ) {}

  async create(
    courseId: string,
    createCertificateDto: CreateCertificateDto,
    images: Express.Multer.File[],
    req: Request,
  ): Promise<IResponse<Certificate>> {
    try {
      const {} = createCertificateDto;
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      console.log(createCertificateDto);
      console.log('*******************************');
      console.log(images);

      return;

      // const newCertificate = await this.certificateRepo.create({});
      // return {
      //   statusCode: HttpStatus.CREATED,
      //   message: 'Certificate added successfully',
      //   data: newCertificate,
      // };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Certificate[]>> {
    try {
      const certificates = await this.certificateRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Certificates retrieved successfully',
        data: certificates,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Certificate>> {
    try {
      const certificate = await this.certificateRepo.findById(id);
      if (!certificate) {
        throw new HttpException('Certificate not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Certificate retrieved successfully',
        data: certificate,
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
      const count = await this.certificateRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Certificate deleted successfully',
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
