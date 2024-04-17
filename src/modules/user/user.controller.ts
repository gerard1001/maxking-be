import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUsersDto } from './dto/delete-user.dto';
import { User } from './model/user.model';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { RoleGuard } from 'src/core/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  async findAll(@Req() req: any): Promise<IResponse<User[]>> {
    return await this.userService.findAll(req);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IResponse<User>> {
    return await this.userService.findById(id);
  }

  @Get('token/:token')
  async findByToken(@Param('token') token: string): Promise<IResponse<User>> {
    return await this.userService.findByToken(token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('/public/:id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
  updatePublicDisplay(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
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
