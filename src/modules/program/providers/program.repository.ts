import { Inject, Injectable } from '@nestjs/common';
import { PROGRAM_MODEL } from 'src/core/constants';
import { Program } from '../model/program.model';
import { CreateProgramDto } from '../dto/create-program.dto';

@Injectable()
export class ProgramRepository {
  constructor(
    @Inject(PROGRAM_MODEL) private readonly programModel: typeof Program,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    return await this.programModel.create(createProgramDto);
  }

  async findAll(): Promise<Program[]> {
    return await this.programModel.findAll({});
  }

  async findById(id: string) {
    return await this.programModel.findByPk(id);
  }

  async findByTitle(title: string) {
    return await this.programModel.findOne({ where: { title } });
  }

  async update(
    id: string,
    updateProgramDto: any,
  ): Promise<[number, Program[]]> {
    return await this.programModel.update(updateProgramDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.programModel.destroy({ where: { id } });
  }
}
