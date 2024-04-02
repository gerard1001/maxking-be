import { Inject, Injectable } from '@nestjs/common';
import { TAG_MODEL } from 'src/core/constants';
import { Tag } from '../model/tag.model';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Op } from 'sequelize';

@Injectable()
export class TagRepository {
  constructor(@Inject(TAG_MODEL) private readonly tagModel: typeof Tag) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagModel.create(createTagDto);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.findAll();
  }

  async findById(id: string) {
    return await this.tagModel.findByPk(id);
  }

  async findByName(name: string) {
    return await this.tagModel.findOne({
      where: { name: { [Op.iLike]: `%${name}` } },
    });
  }

  async update(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<[number, Tag[]]> {
    return await this.tagModel.update(updateTagDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.tagModel.destroy({ where: { id } });
  }
}
