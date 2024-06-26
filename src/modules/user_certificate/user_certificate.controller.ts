import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Req,
} from '@nestjs/common';
import { UserCertificateService } from './user_certificate.service';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { UserCertificate } from './model/user_certificate.model';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';

@Controller('user-certificate')
export class UserCertificateController {
  constructor(
    private readonly userCertificateService: UserCertificateService,
  ) {}

  @Get(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [ENUM_ROLE_TYPE.CLIENT],
  })
  async create(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<IResponse<UserCertificate>> {
    return await this.userCertificateService.create(id, req);
  }

  @Get()
  async findAll(): Promise<IResponse<UserCertificate[]>> {
    return await this.userCertificateService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<IResponse<UserCertificate>> {
    return await this.userCertificateService.findById(id);
  }

  @Get('user/:userId/certificate/:certificateId')
  async findByUserIdAndCertificateId(
    @Param('userId') userId: string,
    @Param('certificateId') certificateId: string,
  ): Promise<IResponse<UserCertificate>> {
    return await this.userCertificateService.findByUserIdAndCertificateId(
      userId,
      certificateId,
    );
  }

  @Get('userCertificateId/:userCertificateId')
  async findByUserCertificateId(
    @Param('userCertificateId') userCertificateId: string,
  ): Promise<IResponse<UserCertificate>> {
    return await this.userCertificateService.findByUserCertificateId(
      userCertificateId,
    );
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.userCertificateService.deleteOne(id);
  }

  @Delete()
  async deleteMultiple(@Body() ids: string[]): Promise<IResponse<ICount>> {
    return await this.userCertificateService.deleteMultiple(ids);
  }
}
