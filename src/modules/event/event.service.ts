import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Event } from './model/event.model';
import { EventRepository } from './providers/event.repository';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepo: EventRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    file: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Event>> {
    try {
      const {
        title,
        about,
        type,
        venue,
        startDate,
        startTime,
        endDate,
        endTime,
        requirements,
      } = createEventDto;

      const event = await this.eventRepo.findByTitle(title);
      if (event) {
        throw new HttpException('Event already exists', HttpStatus.CONFLICT);
      }

      const reqFile =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(file).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      const newEvent = await this.eventRepo.create({
        title,
        about,
        type,
        venue,
        startDate: new Date(startDate),
        startTime: new Date(startTime),
        endDate: new Date(endDate),
        endTime: new Date(endTime),
        requirements,
        coverImage: req['file'] && reqFile.secure_url,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Event added successfully',
        data: newEvent,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Event[]>> {
    try {
      const events = await this.eventRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Events retrieved successfully',
        data: events,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Event>> {
    try {
      const event = await this.eventRepo.findById(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Event retrieved successfully',
        data: event,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    coverImage: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Event>> {
    try {
      const event = await this.eventRepo.findById(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(coverImage).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const updatedEvent = await this.eventRepo.update(id, {
        ...updateEventDto,
        coverImage: req['file'] ? file.secure_url : event.coverImage,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Event updated successfully',
        data: updatedEvent[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const count = await this.eventRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Event deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
