import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { startOfDay, endOfDay, formatISO } from 'date-fns';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { date } = createEventDto;

    const eventDate = new Date(date);
    const eventIsoDate = formatISO(eventDate, { representation: 'complete' });
    const now = new Date();
    const formattedNow = formatISO(now, { representation: 'complete' });
    if (eventIsoDate < formattedNow) {
      throw new BadRequestException('Event date cannot be in the past');
    }

    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());
    const startIsoDate = formatISO(startOfToday, {
      representation: 'complete',
    });
    const endIsoDate = formatISO(endOfToday, {
      representation: 'complete',
    });
    const eventCount = await this.eventModel
      .countDocuments({
        createdBy: 'Assuming it’s there',
        date: { $gte: startIsoDate, $lte: endIsoDate },
      })
      .exec();
    if (eventCount >= 5) {
      throw new BadRequestException(
        `User cannot create more than 5 events per day`,
      );
    }

    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const { date } = updateEventDto;

    if (date) {
      const eventDate = new Date(date);
      if (eventDate < new Date()) {
        throw new BadRequestException('Event date cannot be in the past');
      }
    }

    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, {
        new: true,
      })
      .exec();
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return updatedEvent;
  }

  async remove(id: string): Promise<Event> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deletedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return deletedEvent;
  }

  async rsvp(eventId: string, username: string): Promise<Event> {
    const event = await this.findOne(eventId);

    if (new Date(event.date) < new Date()) {
      throw new BadRequestException(
        'Cannot RSVP to an event that has already occurred',
      );
    }

    if (event.rsvps.includes(username)) {
      throw new BadRequestException(
        `User ${username} has already RSVPed to this event`,
      );
    }
    event.rsvps.push(username);

    return event.save();
  }
  async deleteAll(): Promise<void> {
    await this.eventModel.deleteMany({}).exec();
  }
}
