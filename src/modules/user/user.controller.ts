import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUsersDto } from './dto/delete-user.dto';
import { User } from './model/user.model';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserAuthGuard } from 'src/core/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  findAll(): Promise<IResponse<User[]>> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<IResponse<User>> {
    return this.userService.findById(id);
  }

  @Get('token/:token')
  async findByToken(@Param('token') token: string): Promise<IResponse<User>> {
    return await this.userService.findByToken(token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return this.userService.deleteOne(id);
  }

  @Delete()
  deleteMultiple(
    @Body() deleteUsersDto: DeleteUsersDto,
  ): Promise<IResponse<ICount>> {
    return this.userService.deleteMultiple(deleteUsersDto);
  }
}
