import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './providers/tag.repository';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async create(createTagDto: CreateTagDto): Promise<IResponse> {
    try {
      const { name } = createTagDto;
      const tagExists = await this.tagRepo.findByName(name);
      if (tagExists) {
        throw new HttpException(
          `Tag: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const tag = await this.tagRepo.create(createTagDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Tag added successfully',
        data: tag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse> {
    try {
      const tags = await this.tagRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Tags retrieved successfully',
        data: tags,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse> {
    try {
      const tag = await this.tagRepo.findById(id);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tag retrieved successfully',
        data: tag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string): Promise<IResponse> {
    try {
      const tag = await this.tagRepo.findByName(name);
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tag retrieved successfully',
        data: tag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<IResponse> {
    try {
      const { name } = updateTagDto;
      const nameTag = await this.tagRepo.findByName(name);
      const idTag = await this.tagRepo.findById(id);
      if (!idTag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }
      if (nameTag && nameTag.id !== idTag.id) {
        throw new HttpException(
          `Tag: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const newTag = await this.tagRepo.update(id, updateTagDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Tag updated successfully',
        data: newTag,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse> {
    try {
      const count = await this.tagRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Tag deleted successfully',
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
