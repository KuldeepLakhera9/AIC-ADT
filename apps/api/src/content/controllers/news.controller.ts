import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NewsService } from '../services/news.service.js';
import { CreateNewsDto } from '../dto/create-news.dto.js';
import { UpdateNewsDto } from '../dto/update-news.dto.js';
import { QueryNewsDto } from '../dto/query-news.dto.js';
import {
  NewsArticleResponseDto,
  PaginatedNewsResponseDto,
} from '../dto/news-response.dto.js';
import { SessionAuthGuard } from '../../auth/guards/session-auth.guard.js';
import { PermissionsGuard } from '../../auth/guards/permissions.guard.js';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator.js';
import { CurrentUser } from '../../auth/decorators/current-user.decorator.js';
import { Permission } from '../../auth/auth.types.js';
import { AuthUserDto } from '../../auth/dto/auth-user.dto.js';

@Controller('content/news')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @RequirePermissions(Permission.CONTENT_READ)
  async listNews(@Query() query: QueryNewsDto): Promise<PaginatedNewsResponseDto> {
    return this.newsService.listNews(query);
  }

  @Get(':id')
  @RequirePermissions(Permission.CONTENT_READ)
  async getNewsById(@Param('id') id: string): Promise<NewsArticleResponseDto> {
    return this.newsService.getNewsById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermissions(Permission.CONTENT_CREATE)
  async createNews(
    @Body() dto: CreateNewsDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<NewsArticleResponseDto> {
    return this.newsService.createNews(dto, user);
  }

  @Put(':id')
  @RequirePermissions(Permission.CONTENT_UPDATE)
  async updateNews(
    @Param('id') id: string,
    @Body() dto: UpdateNewsDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<NewsArticleResponseDto> {
    return this.newsService.updateNews(id, dto, user);
  }

  @Post(':id/submit-review')
  @HttpCode(HttpStatus.OK)
  @RequirePermissions(Permission.CONTENT_SUBMIT_REVIEW)
  async submitForReview(
    @Param('id') id: string,
    @Query('locale') locale: string = 'en',
    @CurrentUser() user: AuthUserDto,
  ): Promise<NewsArticleResponseDto> {
    return this.newsService.submitForReview(id, locale, user);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @RequirePermissions(Permission.CONTENT_ARCHIVE)
  async archiveNews(
    @Param('id') id: string,
    @Query('locale') locale: string = 'en',
    @CurrentUser() user: AuthUserDto,
  ): Promise<NewsArticleResponseDto> {
    return this.newsService.archiveNews(id, locale, user);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @RequirePermissions(Permission.CONTENT_UPDATE)
  async restoreNews(
    @Param('id') id: string,
    @Query('locale') locale: string = 'en',
    @CurrentUser() user: AuthUserDto,
  ): Promise<NewsArticleResponseDto> {
    return this.newsService.restoreNews(id, locale, user);
  }
}
