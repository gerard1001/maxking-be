import { Inject, Injectable } from '@nestjs/common';
import { TESTIMONIAL_MODEL } from 'src/core/constants';
import { Testimonial } from '../model/testimonial.model';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import { Op } from 'sequelize';
import { User } from 'src/modules/user/model/user.model';
import { Profile } from 'src/modules/profile/model/profile.model';

@Injectable()
export class TestimonialRepository {
  constructor(
    @Inject(TESTIMONIAL_MODEL)
    private readonly testimonialModel: typeof Testimonial,
  ) {}

  async create(
    createTestimonialDto: CreateTestimonialDto,
  ): Promise<Testimonial> {
    return await this.testimonialModel.create(createTestimonialDto);
  }

  async findAll(): Promise<Testimonial[]> {
    return await this.testimonialModel.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['picture', 'city', 'country'],
            },
          ],
        },
      ],
    });
  }

  async findById(id: string) {
    return await this.testimonialModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['picture', 'city', 'country'],
            },
          ],
        },
      ],
    });
  }

  async update(
    id: string,
    updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<[number, Testimonial[]]> {
    return await this.testimonialModel.update(updateTestimonialDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.testimonialModel.destroy({ where: { id } });
  }
}
