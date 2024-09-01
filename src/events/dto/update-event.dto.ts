import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsDate, MinDate } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsDate()
  @MinDate(new Date(), { message: 'Event date cannot be in the past' })
  date?: Date;
}
