import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserModuleService } from './user_module.service';
import { CreateUserModuleDto } from './dto/create-user_module.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserModule } from './model/user_module.model';

@Controller('user-course')
export class UserModuleController {
  constructor(private readonly articleModuleService: UserModuleService) {}

  @Post()
  async create(
    @Body() createUserModuleDto: CreateUserModuleDto,
  ): Promise<IResponse<UserModule>> {
    return await this.articleModuleService.create(createUserModuleDto);
  }

  @Get()
  async findAll(): Promise<IResponse<UserModule[]>> {
    return await this.articleModuleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<UserModule>> {
    return await this.articleModuleService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.articleModuleService.deleteOne(id);
  }

  @Delete()
  async deleteByUserAndModuleId(
    @Body() deleteUserModuleDto: CreateUserModuleDto,
  ): Promise<IResponse<ICount>> {
    return await this.articleModuleService.deleteByUserAndModuleId(
      deleteUserModuleDto,
    );
  }
}
