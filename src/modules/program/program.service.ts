import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramRepository } from './providers/program.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Program } from './model/program.model';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';

@Injectable()
export class ProgramService {
  constructor(
    private readonly programRepo: ProgramRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProgramDto: CreateProgramDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Program>> {
    try {
      const { title, short, description } = createProgramDto;
      const programExists = await this.programRepo.findByShort(short.trim());
      if (programExists) {
        throw new HttpException(
          'This program title already exists',
          HttpStatus.CONFLICT,
        );
      }

      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const newProgram = await this.programRepo.create({
        coverImage: req['file'] && file?.secure_url,
        title: title.trim(),
        short: short.trim().split(' ').join('-').toLowerCase(),
        description,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: `Program created successfully`,
        data: newProgram,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Program[]>> {
    try {
      const programs = await this.programRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Programs retrieved successfully',
        data: programs,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<IResponse<Program>> {
    try {
      const program = await this.programRepo.findById(id);
      if (!program) {
        throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Program retrieved successfully',
        data: program,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByShort(short: string): Promise<IResponse<Program>> {
    try {
      const program = await this.programRepo.findByShort(short);
      if (!program) {
        throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Program retrieved successfully',
        data: program,
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
    updateProgramDto: UpdateProgramDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Program>> {
    try {
      const program = await this.programRepo.findById(id);
      if (!program) {
        throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
      }

      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      const newProgram = await this.programRepo.update(id, {
        ...updateProgramDto,
        coverImage: req['file'] ? file?.secure_url : program.coverImage,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Updated program successfuly',
        data: newProgram[1][0],
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
      const count = await this.programRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Program deleted successfully',
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
