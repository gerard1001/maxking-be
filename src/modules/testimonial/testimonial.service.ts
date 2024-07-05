import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { TestimonialRepository } from './providers/testimonial.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Testimonial } from './model/testimonial.model';
import { UserRepository } from '../user/providers/user.repository';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';

@Injectable()
export class TestimonialService {
  constructor(
    private readonly testimonialRepo: TestimonialRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async create(
    createTestimonialDto: CreateTestimonialDto,
    req: Request,
  ): Promise<IResponse<Testimonial>> {
    try {
      const { text } = createTestimonialDto;
      const userId = req['user'].id;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (
        user.testimonial &&
        user.roles[0].type !== ENUM_ROLE_TYPE.SUPER_ADMIN
      ) {
        await this.testimonialRepo.deleteOne(user.testimonial.id);
      }
      const newTestimonial = await this.testimonialRepo.create({
        userId,
        text: text.trim(),
        isPinned: false,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Testimonial added successfully',
        data: newTestimonial,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Testimonial[]>> {
    try {
      const testimonials = await this.testimonialRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Testimonials retrieved successfully',
        data: testimonials,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Testimonial>> {
    try {
      const testimonial = await this.testimonialRepo.findById(id);
      if (!testimonial) {
        throw new HttpException('Testimonial not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Testimonial retrieved successfully',
        data: testimonial,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserId(userId: string): Promise<IResponse<Testimonial>> {
    try {
      const testimonials = await this.testimonialRepo.findByUserId(userId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Your testimonials were retrieved successfully',
        data: testimonials,
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
    updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<IResponse<Testimonial>> {
    try {
      const idTestimonial = await this.testimonialRepo.findById(id);
      if (!idTestimonial) {
        throw new HttpException('Testimonial not found', HttpStatus.NOT_FOUND);
      }
      const newTestimonial = await this.testimonialRepo.update(
        id,
        updateTestimonialDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Testimonial updated successfully',
        data: newTestimonial[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async togglePin(id: string): Promise<IResponse<Testimonial>> {
    try {
      const testimonial = await this.testimonialRepo.findById(id);
      if (!testimonial) {
        throw new HttpException('Testimonial not found', HttpStatus.NOT_FOUND);
      }
      const pinnedTestimonials =
        await this.testimonialRepo.findPinnedTestimonials();
      if (!testimonial.isPinned && pinnedTestimonials.length >= 6) {
        throw new HttpException(
          'You can only pin 5 testimonials at a time',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newTestimonial = await this.testimonialRepo.update(id, {
        isPinned: !testimonial.isPinned,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Testimonial updated successfully',
        data: newTestimonial[1][0],
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
      const count = await this.testimonialRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Testimonial deleted successfully',
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
