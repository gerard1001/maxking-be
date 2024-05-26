import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UserAuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ENUM_ROLE_TYPE } from 'src/core/constants/role.constants';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Event } from './model/event.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/core/upload/multer.config';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  // @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: false,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
    ],
  })
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<IResponse<Event>> {
    return await this.eventService.create(createEventDto, file, req);
  }

  @Get()
  findAll(): Promise<IResponse<Event[]>> {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Event>> {
    return this.eventService.findById(id);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard, RoleGuard)
  @SetMetadata('metadata', {
    checkAccOwner: true,
    roles: [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
      ENUM_ROLE_TYPE.MANAGER,
      ENUM_ROLE_TYPE.CLIENT,
    ],
  })
  async remove(@Param('id') id: string): Promise<IResponse<ICount>> {
    return await this.eventService.deleteOne(id);
  }
}
