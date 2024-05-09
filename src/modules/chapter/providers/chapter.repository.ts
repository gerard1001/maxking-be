import { Inject, Injectable } from '@nestjs/common';
import { CHAPTER_MODEL } from 'src/core/constants';
import { Chapter } from '../model/chapter.model';
import { Op } from 'sequelize';

@Injectable()
export class ChapterRepository {
  constructor(
    @Inject(CHAPTER_MODEL) private readonly chapterModel: typeof Chapter,
  ) {}

  async create(createChapterDto: any): Promise<Chapter> {
    return await this.chapterModel.create(createChapterDto);
  }

  async findAll(): Promise<Chapter[]> {
    return await this.chapterModel.findAll();
  }

  async findById(id: string): Promise<Chapter> {
    return await this.chapterModel.findByPk(id);
  }

  async findByTitle(title: string): Promise<Chapter> {
    return await this.chapterModel.findOne({
      where: { title: { [Op.iLike]: `%${title}` } },
    });
  }

  async countByModuleId(moduleId: string): Promise<number> {
    return await this.chapterModel.count({ where: { moduleId } });
  }

  async findByModuleIdAndChapterNumber(
    moduleId: string,
    chapterNumber: number,
  ): Promise<Chapter> {
    return await this.chapterModel.findOne({
      where: { moduleId, chapterNumber: chapterNumber },
    });
  }

  async findByModuleIdAndChapterNumberGreaterThan(
    moduleId: string,
    chapterNumber: number,
  ): Promise<Chapter[]> {
    return await this.chapterModel.findAll({
      where: { moduleId, chapterNumber: { [Op.gt]: chapterNumber } },
    });
  }

  async update(
    id: string,
    updateChapterDto: any,
  ): Promise<[number, Chapter[]]> {
    return await this.chapterModel.update(updateChapterDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.chapterModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.chapterModel.destroy({ where: { id: ids } });
  }
}
