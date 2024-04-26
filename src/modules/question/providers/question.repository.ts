import { Inject, Injectable } from '@nestjs/common';
import { QUESTION_MODEL } from 'src/core/constants';
import { Question } from '../model/question.model';

@Injectable()
export class QuestionRepository {
  constructor(
    @Inject(QUESTION_MODEL) private readonly questionModel: typeof Question,
  ) {}

  async create(createQuestionDto: any): Promise<Question> {
    return await this.questionModel.create(createQuestionDto);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionModel.findAll();
  }

  async findById(id: string): Promise<Question> {
    return await this.questionModel.findByPk(id);
  }

  async update(
    id: string,
    updateQuestionDto: any,
  ): Promise<[number, Question[]]> {
    return await this.questionModel.update(updateQuestionDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.questionModel.destroy({ where: { id } });
  }

  async deleteMultiple(ids: string[]): Promise<number> {
    return await this.questionModel.destroy({ where: { id: ids } });
  }
}
