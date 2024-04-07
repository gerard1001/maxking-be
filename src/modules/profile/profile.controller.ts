import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { multerOptions } from 'src/core/upload/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/core/guards/role.guard';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './model/profile.model';
import { IResponse } from 'src/core/interfaces/response.interface';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @UploadedFile() picture: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Profile>> {
    return await this.profileService.create(createProfileDto, picture, req);
  }

  @Get(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
  async findById(@Param('id') id: string): Promise<IResponse<Profile>> {
    return await this.profileService.findById(id);
  }

  @Get('user/:id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN],
  })
  async findByUserId(@Param('id') id: string): Promise<IResponse<Profile>> {
    return await this.profileService.findByUserId(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() picture: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Profile>> {
    return await this.profileService.update(id, updateProfileDto, picture, req);
  }
}
