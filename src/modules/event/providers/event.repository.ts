import { Inject, Injectable } from '@nestjs/common';
import { EVENT_MODEL } from 'src/core/constants';
import { Event } from '../model/event.model';
import { CreateEventDto } from '../dto/create-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @Inject(EVENT_MODEL)
    private readonly eventModel: typeof Event,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventModel.create(createEventDto);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventModel.findAll();
  }

  async findById(id: string) {
    return await this.eventModel.findByPk(id);
  }

  async findByTitle(title: string) {
    return await this.eventModel.findOne({ where: { title } });
  }

  async update(id: string, updateEventDto: any): Promise<[number, Event[]]> {
    return await this.eventModel.update(updateEventDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.eventModel.destroy({ where: { id } });
  }
}
