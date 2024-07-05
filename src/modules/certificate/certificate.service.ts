import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Certificate } from './model/certificate.model';
import { CertificateRepository } from './providers/certificate.repository';
import { CourseRepository } from '../course/providers/course.repository';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';

@Injectable()
export class CertificateService {
  constructor(
    private readonly certificateRepo: CertificateRepository,
    private readonly courseRepo: CourseRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    courseId: string,
    createCertificateDto: CreateCertificateDto,
    images: Express.Multer.File[],
    req: Request,
  ): Promise<IResponse<Certificate>> {
    try {
      const {} = createCertificateDto;

      const certificate = await this.certificateRepo.findByCourseId(courseId);
      const course = await this.courseRepo.findById(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      if (course?.questions?.length === 0) {
        throw new HttpException(
          'Course has no assessment',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (createCertificateDto.issuers.name.length < 1) {
        throw new HttpException(
          'At least one issuer is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (createCertificateDto.issuers.name.length > 2) {
        throw new HttpException(
          'Only two issuers are allowed',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        createCertificateDto.issuers.name.length !== images.length &&
        !certificate
      ) {
        throw new HttpException(
          'Number of issuers and signatures do not match',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        createCertificateDto.issuers.name.length !==
        createCertificateDto.issuers.position.length
      ) {
        throw new HttpException(
          'Number of issuers and positions do not match',
          HttpStatus.BAD_REQUEST,
        );
      }

      const issuersArray = [];

      for (let i = 0; i < createCertificateDto.issuers.name.length; i++) {
        if (!createCertificateDto.issuers.name[i]) {
          throw new HttpException(
            'Issuer name is required',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (
          images.length < createCertificateDto.issuers.name.length &&
          !certificate
        ) {
          throw new HttpException(
            'Issuer signature is required',
            HttpStatus.BAD_REQUEST,
          );
        }

        const imageFile =
          req['files'] &&
          images.find((file) => file.fieldname === `signature[${i}]`);

        const file =
          imageFile &&
          (await this.cloudinaryService.uploadImage(imageFile).catch((err) => {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }));

        issuersArray.push({
          name: createCertificateDto.issuers.name[i],
          signature:
            certificate && !file
              ? certificate?.issuers &&
                JSON.parse(certificate?.issuers)[i].signature
              : file.secure_url,
          position: createCertificateDto.issuers.position[i],
        });
      }
      if (certificate) {
        await this.certificateRepo.deleteOne(certificate.id);
        // throw new HttpException(
        //   'Certificate for this course already exists',
        //   HttpStatus.BAD_REQUEST,
        // );
      }
      const newCertificate = await this.certificateRepo.create({
        issuers: issuersArray,
        courseId,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Certificate added successfully',
        data: newCertificate,
      };
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
