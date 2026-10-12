import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EventService } from '../services/event.service.js';
import { CreateEventDto } from '../dto/create-event.dto.js';
import { UpdateEventDto } from '../dto/update-event.dto.js';
import { QueryEventDto } from '../dto/query-event.dto.js';
import { SubmitReviewDto } from '../dto/submit-review.dto.js';
import {
  EventResponseDto,
  PaginatedEventResponseDto,
} from '../dto/event-response.dto.js';
import { SessionAuthGuard } from '../../auth/guards/session-auth.guard.js';
import { PermissionsGuard } from '../../auth/guards/permissions.guard.js';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator.js';
import { CurrentUser } from '../../auth/decorators/current-user.decorator.js';
import { Permission } from '../../auth/auth.types.js';
import type { AuthUserDto } from '../../auth/dto/auth-user.dto.js';

@Controller('content/events')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @RequirePermissions(Permission.CONTENT_READ)
  async listEvents(
    @Query() query: QueryEventDto,
  ): Promise<PaginatedEventResponseDto> {
    return this.eventService.listEvents(query);
  }

  @Get(':id')
  @RequirePermissions(Permission.CONTENT_READ)
  async getEventById(@Param('id') id: string): Promise<EventResponseDto> {
    return this.eventService.getEventById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermissions(Permission.CONTENT_CREATE)
  async createEvent(
    @Body() dto: CreateEventDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<EventResponseDto> {
    return this.eventService.createEvent(dto, user);
  }

  @Put(':id')
  @RequirePermissions(Permission.CONTENT_UPDATE)
  async updateEvent(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<EventResponseDto> {
    return this.eventService.updateEvent(id, dto, user);
  }

  @Post(':id/submit-review')
  @HttpCode(HttpStatus.OK)
  @RequirePermissions(Permission.CONTENT_SUBMIT_REVIEW)
  async submitForReview(
    @Param('id') id: string,
    @Query('locale') locale: string = 'en',
    @Body() body: SubmitReviewDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<EventResponseDto> {
    return this.eventService.submitForReview(
      id,
      locale,
      body?.submissionNotes,
      user,
    );
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @RequirePermissions(Permission.CONTENT_PUBLISH)
  async archiveEvent(
    @Param('id') id: string,
    @Query('locale') locale: string = 'en',
    @CurrentUser() user: AuthUserDto,
  ): Promise<EventResponseDto> {
    return this.eventService.archiveEvent(id, locale, user);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @RequirePermissions(Permission.CONTENT_PUBLISH)
  async restoreEvent(
    @Param('id') id: string,
    @Query('locale') locale: string = 'en',
    @CurrentUser() user: AuthUserDto,
  ): Promise<EventResponseDto> {
    return this.eventService.restoreEvent(id, locale, user);
  }
}
