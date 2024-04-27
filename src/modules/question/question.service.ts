import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
// import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './providers/question.repository';
import {
  Choice,
  ICount,
  IResponse,
} from 'src/core/interfaces/response.interface';
import { Question } from './model/question.model';
import { CourseRepository } from '../course/providers/course.repository';
import { ModuleRepository } from '../module/providers/module.repository';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly courseRepo: CourseRepository,
    private readonly moduleRepo: ModuleRepository,
  ) {}

  async create(
    id: string,
    createQuestionDto: CreateQuestionDto,
  ): Promise<IResponse<Question>> {
    try {
      const { question, choices, trueAnswer } = createQuestionDto;
      const course = await this.courseRepo.findById(id);
      const module = await this.moduleRepo.findById(id);

      if (!course && !module) {
        throw new HttpException(
          'Course or Module not found',
          HttpStatus.NOT_FOUND,
        );
      }
      if (course && module) {
        throw new HttpException(
          'Course and Module cannot be selected at the same time',
          HttpStatus.BAD_REQUEST,
        );
      }
      const isTrueAnswerValid = choices
        .map((choice) => choice.choice)
        .includes(trueAnswer);
      const isTrueAnswerUnique =
        choices
          .map((choice) => choice.choice)
          .filter((choice) => choice === trueAnswer).length === 1;
      if (!isTrueAnswerValid || !isTrueAnswerUnique) {
        throw new HttpException(
          'True answer must match one of the choices',
          HttpStatus.BAD_REQUEST,
        );
      }
      function checkChoicesIndexes(choices: Choice[]) {
        const indexes = choices.map((choice) => choice.index);
        indexes.sort((a, b) => a - b);
        let expectedIndex = 1;

        for (const index of indexes) {
          if (index !== expectedIndex) {
            return false;
          }
          expectedIndex++;
        }

        return true;
      }

      if (!checkChoicesIndexes(choices)) {
        throw new HttpException(
          'Choices indexes must be consecutive numbers starting from 1',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newQuestion = await this.questionRepo.create({
        question,
        choices,
        trueAnswer,
        courseId: course ? course.id : null,
        moduleId: module ? module.id : null,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: `Question created successfully`,
        data: newQuestion,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Question[]>> {
    try {
      const questions = await this.questionRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Questions retrieved successfully',
        data: questions,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Question>> {
    try {
      const question = await this.questionRepo.findById(id);
      if (!question) {
        throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Question retrieved successfully',
        data: question,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByModuleOrCourseId(id: string): Promise<IResponse<Question[]>> {
    try {
      const questions = await this.questionRepo.findByModuleOrCourseId(id);
      if (!questions) {
        throw new HttpException('Questions not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Questions retrieved successfully',
        data: questions,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async update(
  //   id: string,
  //   updateQuestionDto: UpdateQuestionDto,
  // ): Promise<IResponse<Question>> {
  //   try {
  //     const idQuestion = await this.questionRepo.findById(id);
  //     if (!idQuestion) {
  //       throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
  //     }

  //     const newQuestion = await this.questionRepo.update(id, updateQuestionDto);
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Question updated successfully',
  //       data: newQuestion[1][0],
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Server Error',
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const question = await this.questionRepo.findById(id);
      if (!question) {
        throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
      }
      const count = await this.questionRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Question deleted successfully',
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
