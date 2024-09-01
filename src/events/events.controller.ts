import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({ status: 201, description: 'Event successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateEventDto })
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      return await this.eventsService.create(createEventDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all events' })
  @ApiResponse({ status: 200, description: 'List of all events.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific event by ID' })
  @ApiResponse({ status: 200, description: 'Event details retrieved.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific event by ID' })
  @ApiResponse({ status: 200, description: 'Event successfully updated.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ type: UpdateEventDto })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific event by ID' })
  @ApiResponse({ status: 200, description: 'Event successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/rsvp')
  @ApiOperation({ summary: 'RSVP to a specific event' })
  @ApiResponse({
    status: 201,
    description: 'Successfully RSVPed to the event.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({
    schema: { type: 'object', properties: { username: { type: 'string' } } },
  })
  async rsvp(@Param('id') id: string, @Body('username') username: string) {
    try {
      return await this.eventsService.rsvp(id, username);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all events' })
  @ApiResponse({ status: 204, description: 'All events successfully deleted.' })
  deleteAll() {
    return this.eventsService.deleteAll();
  }
}
