import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { User } from '../../user/model/user.model';
import { USER_MODEL } from 'src/core/constants';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class AuthRepository {
  constructor(@Inject(USER_MODEL) private readonly userModel: typeof User) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
