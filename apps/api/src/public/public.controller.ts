import { Controller, Get, Param, Query, Header } from '@nestjs/common';
import { PublicService } from './public.service.js';
import { QueryPublicContentDto } from './dto/query-public.dto.js';
import {
  PublicNewsArticleDto,
  PaginatedPublicNewsDto,
} from './dto/public-news.dto.js';
import {
  PublicEventDto,
  PaginatedPublicEventsDto,
} from './dto/public-event.dto.js';
import {
  PublicProgramDto,
  PaginatedPublicProgramsDto,
} from './dto/public-program.dto.js';
import {
  PublicStartupDto,
  PaginatedPublicStartupsDto,
} from './dto/public-startup.dto.js';
import {
  PublicPublicationDto,
  PaginatedPublicPublicationsDto,
} from './dto/public-publication.dto.js';
import { PublicInstitutionalPageDto } from './dto/public-page.dto.js';
import { PublicMediaAssetDto } from './dto/public-media.dto.js';
import { PUBLIC_CACHE_CONTROL_HEADER } from './public.constants.js';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  // 1. News Articles
  @Get('news')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublishedNews(
    @Query() query: QueryPublicContentDto,
  ): Promise<PaginatedPublicNewsDto> {
    return this.publicService.getPublishedNews(query);
  }

  @Get('news/:slug')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublishedNewsBySlug(
    @Param('slug') slug: string,
    @Query('locale') locale: string = 'en',
  ): Promise<PublicNewsArticleDto> {
    return this.publicService.getPublishedNewsBySlug(slug, locale);
  }

  // 2. Events & Workshops
  @Get('events')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicEvents(
    @Query() query: QueryPublicContentDto,
  ): Promise<PaginatedPublicEventsDto> {
    return this.publicService.getPublicEvents(query);
  }

  @Get('events/:slug')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicEventBySlug(
    @Param('slug') slug: string,
    @Query('locale') locale: string = 'en',
  ): Promise<PublicEventDto> {
    return this.publicService.getPublicEventBySlug(slug, locale);
  }

  // 3. Incubation Programs
  @Get('programs')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicPrograms(
    @Query() query: QueryPublicContentDto,
  ): Promise<PaginatedPublicProgramsDto> {
    return this.publicService.getPublicPrograms(query);
  }

  @Get('programs/:slug')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicProgramBySlug(
    @Param('slug') slug: string,
    @Query('locale') locale: string = 'en',
  ): Promise<PublicProgramDto> {
    return this.publicService.getPublicProgramBySlug(slug, locale);
  }

  // 4. Portfolio Startups
  @Get('startups')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicStartups(
    @Query() query: QueryPublicContentDto,
  ): Promise<PaginatedPublicStartupsDto> {
    return this.publicService.getPublicStartups(query);
  }

  @Get('startups/:slug')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicStartupBySlug(
    @Param('slug') slug: string,
  ): Promise<PublicStartupDto> {
    return this.publicService.getPublicStartupBySlug(slug);
  }

  // 5. Statutory Reports & Publications
  @Get('publications')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicPublications(
    @Query() query: QueryPublicContentDto,
  ): Promise<PaginatedPublicPublicationsDto> {
    return this.publicService.getPublicPublications(query);
  }

  @Get('publications/:slug')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicPublicationBySlug(
    @Param('slug') slug: string,
  ): Promise<PublicPublicationDto> {
    return this.publicService.getPublicPublicationBySlug(slug);
  }

  // 6. Institutional Pages
  @Get('pages/:slug')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublishedPageBySlug(
    @Param('slug') slug: string,
    @Query('locale') locale: string = 'en',
  ): Promise<PublicInstitutionalPageDto> {
    return this.publicService.getPublishedPageBySlug(slug, locale);
  }

  // 7. Public Media
  @Get('media/:id')
  @Header('Cache-Control', PUBLIC_CACHE_CONTROL_HEADER)
  async getPublicMedia(
    @Param('id') id: string,
  ): Promise<PublicMediaAssetDto> {
    return this.publicService.getPublicMedia(id);
  }
}
