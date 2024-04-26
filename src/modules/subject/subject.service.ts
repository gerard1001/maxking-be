import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectRepository } from './providers/subject.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Subject } from './model/subject.model';
import { CategoryRepository } from '../category/providers/category.repository';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepo: SubjectRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async create(
    id: string,
    createSubjectDto: CreateSubjectDto,
  ): Promise<IResponse<Subject>> {
    try {
      const { name } = createSubjectDto;
      const categoryExists = await this.categoryRepo.findById(id);
      if (!categoryExists) {
        throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
      }
      const subjectExists = await this.subjectRepo.findByName(name.trim());
      if (subjectExists) {
        throw new HttpException(
          `Subject: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      const subject = await this.subjectRepo.create({
        name: name.trim(),
        categoryId: id,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: `Subject created successfully`,
        data: subject,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Subject[]>> {
    try {
      const subjects = await this.subjectRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Subjects retrieved successfully',
        data: subjects,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Subject>> {
    try {
      const subject = await this.subjectRepo.findById(id);
      if (!subject) {
        throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Subject retrieved successfully',
        data: subject,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string): Promise<IResponse<Subject>> {
    try {
      const subject = await this.subjectRepo.findByName(name);
      if (!subject) {
        throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Subject retrieved successfully',
        data: subject,
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
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<IResponse<Subject>> {
    try {
      const { name } = updateSubjectDto;
      const nameSubject = await this.subjectRepo.findByName(name);
      const idSubject = await this.subjectRepo.findById(id);
      if (!idSubject) {
        throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
      }
      if (nameSubject && nameSubject.id !== idSubject.id) {
        throw new HttpException(
          `Subject: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const newSubject = await this.subjectRepo.update(id, updateSubjectDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Subject updated successfully',
        data: newSubject[1][0],
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
      const subject = await this.subjectRepo.findById(id);
      if (!subject) {
        throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.subjectRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Subject deleted successfully',
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
