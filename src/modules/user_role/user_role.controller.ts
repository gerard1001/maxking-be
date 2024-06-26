import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { UserRole } from './models/user_role.model';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  async create(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole> {
    return await this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  findAll(): Promise<UserRole[]> {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserRole> {
    return this.userRoleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userRoleService.deleteOne(id);
  }
}
