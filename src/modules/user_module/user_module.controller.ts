import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserModuleService } from './user_module.service';
import { CreateUserModuleDto } from './dto/create-user_module.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserModule } from './model/user_module.model';
import { UpdateUserModuleDto } from './dto/update-user_module.dto';

@Controller('user-module')
export class UserModuleController {
  constructor(private readonly userModuleService: UserModuleService) {}

  @Post()
  async create(
    @Body() createUserModuleDto: CreateUserModuleDto,
  ): Promise<IResponse<UserModule>> {
    return await this.userModuleService.create(createUserModuleDto);
  }

  @Get()
  async findAll(): Promise<IResponse<UserModule[]>> {
    return await this.userModuleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<UserModule>> {
    return await this.userModuleService.findById(id);
  }

  @Get('user/:userId/module/:moduleId')
  async findByUserAndModuleId(
    @Param('userId') userId: string,
    @Param('moduleId') moduleId: string,
  ): Promise<IResponse<UserModule>> {
    return await this.userModuleService.findByUserAndModuleId(userId, moduleId);
  }

  @Patch(':id')
  async updateCurrentChapter(
    @Param('id') id: string,
    @Body() updateUserModuleDto: UpdateUserModuleDto,
  ): Promise<IResponse<UserModule>> {
    return await this.userModuleService.updateCurrentChapter(
      id,
      updateUserModuleDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.userModuleService.deleteOne(id);
  }

  @Delete('user/:userId/module/:moduleId')
  async deleteByUserAndModuleId(
    @Param('userId') userId: string,
    @Param('moduleId') moduleId: string,
  ): Promise<IResponse<ICount>> {
    return await this.userModuleService.deleteByUserAndModuleId(
      userId,
      moduleId,
    );
  }
}
