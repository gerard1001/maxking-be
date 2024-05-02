import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChapterRepository } from './providers/chapter.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Chapter } from './model/chapter.model';
import { ModuleRepository } from '../module/providers/module.repository';

@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly moduleRepo: ModuleRepository,
  ) {}

  async create(
    id: string,
    createChapterDto: CreateChapterDto,
  ): Promise<IResponse<Chapter>> {
    try {
      const { title, description, content } = createChapterDto;
      const chapterNumber = (await this.chapterRepo.countByModuleId(id)) + 1;
      const moduleExists = await this.moduleRepo.findById(id);
      if (!moduleExists) {
        throw new HttpException(`Module not found`, HttpStatus.NOT_FOUND);
      }
      const chapterExists = await this.chapterRepo.findByTitle(title.trim());
      if (chapterExists) {
        throw new HttpException(
          `Chapter: ${title} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const chapterNumberExists =
        await this.chapterRepo.findByModuleIdAndChapterNumber(
          id,
          chapterNumber,
        );
      if (chapterNumberExists) {
        throw new HttpException(
          `Chapter number: ${chapterNumber} already exists for this module`,
          HttpStatus.CONFLICT,
        );
      }

      const chapter = await this.chapterRepo.create({
        chapterNumber,
        title: title && title.trim(),
        description: description && description.trim(),
        content: content && content,
        moduleId: id,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: `Chapter created successfully`,
        data: chapter,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Chapter[]>> {
    try {
      const chapters = await this.chapterRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Chapters retrieved successfully',
        data: chapters,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Chapter>> {
    try {
      const chapter = await this.chapterRepo.findById(id);
      if (!chapter) {
        throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Chapter retrieved successfully',
        data: chapter,
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
    updateChapterDto: UpdateChapterDto,
  ): Promise<IResponse<Chapter>> {
    try {
      const { title } = updateChapterDto;
      const nameChapter = await this.chapterRepo.findByTitle(title);
      const idChapter = await this.chapterRepo.findById(id);
      if (!idChapter) {
        throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);
      }
      if (nameChapter && nameChapter.id !== idChapter.id) {
        throw new HttpException(
          `Chapter: ${title} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const newChapter = await this.chapterRepo.update(id, updateChapterDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Chapter updated successfully',
        data: newChapter[1][0],
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
      const chapter = await this.chapterRepo.findById(id);
      if (!chapter) {
        throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);
      }

      const chapterNumber = chapter.chapterNumber;

      await this.chapterRepo.deleteOne(id);

      const chaptersToUpdate =
        await this.chapterRepo.findByModuleIdAndChapterNumberGreaterThan(
          chapter.moduleId,
          chapterNumber,
        );
      for (const chapterToUpdate of chaptersToUpdate) {
        // chapterToUpdate.chapterNumber -= 1;
        await this.chapterRepo.update(chapterToUpdate.id, {
          chapterNumber: chapterToUpdate.chapterNumber - 1,
        });
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Chapter deleted successfully',
        data: { count: 1 },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

/* 
  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const chapter = await this.chapterRepo.findById(id);
      if (!chapter) {
        throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.chapterRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Chapter deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
*/
