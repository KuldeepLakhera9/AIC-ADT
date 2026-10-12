import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { AppLoggerService } from '../common/logger/app-logger.service.js';
import { ContentStatus, MediaVisibility } from '@prisma/client';
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
import { DEFAULT_PUBLIC_LIMIT, DEFAULT_PUBLIC_PAGE } from './public.constants.js';

@Injectable()
export class PublicService {
  private readonly logger = new AppLoggerService('PublicService');

  constructor(private readonly prisma: PrismaService) {}

  // ---------------------------------------------------------------------------
  // 1. PUBLISHED NEWS ARTICLES
  // ---------------------------------------------------------------------------

  async getPublishedNews(query: QueryPublicContentDto): Promise<PaginatedPublicNewsDto> {
    const page = query.page || DEFAULT_PUBLIC_PAGE;
    const limit = query.limit || DEFAULT_PUBLIC_LIMIT;
    const skip = (page - 1) * limit;
    const locale = query.locale || 'en';

    if (this.prisma.connected) {
      const where: any = {
        translations: {
          some: {
            locale,
            status: ContentStatus.PUBLISHED,
          },
        },
      };

      if (query.category) {
        where.category = query.category;
      }

      if (query.search) {
        where.OR = [
          { slug: { contains: query.search.trim(), mode: 'insensitive' } },
          {
            translations: {
              some: {
                locale,
                headline: { contains: query.search.trim(), mode: 'insensitive' },
              },
            },
          },
        ];
      }

      const total = await this.prisma.newsArticle.count({ where });
      const articles = await this.prisma.newsArticle.findMany({
        where,
        include: {
          translations: {
            where: { locale, status: ContentStatus.PUBLISHED },
          },
        },
        orderBy: { publishDate: 'desc' },
        take: limit,
        skip,
      });

      const data: PublicNewsArticleDto[] = articles.map((a) => {
        const tr = a.translations[0];
        return {
          id: a.id,
          slug: a.slug,
          headline: tr?.headline || 'Institutional Announcement',
          summary: tr?.summary || '',
          content: tr?.content || {},
          category: a.category,
          publishDate: a.publishDate.toISOString(),
          sourceAttribution: a.sourceAttribution,
          externalPressLink: a.externalPressLink,
          thumbnailAssetId: a.thumbnailAssetId,
          tags: (tr?.tags as string[]) || [],
          keyFacts: tr?.keyFacts ? (tr.keyFacts as any) : undefined,
          locale,
          isAvailableInLocale: Boolean(tr),
        };
      });

      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      };
    }

    // Verified seed institutional press releases for offline / dev fallback
    const seedArticles: PublicNewsArticleDto[] = [
      {
        id: 'seed-news-1',
        slug: 'sisfs-cohort-4-announcement',
        headline: locale === 'mr'
          ? 'एसआयएसएफएस अंतर्गत चौथ्या तुकडीसाठी अर्ज प्रक्रिया सुरू'
          : 'AIC-ADT Baramati Announces Cohort 4 Applications Under Startup India Seed Fund Scheme (SISFS)',
        summary: locale === 'mr'
          ? 'कृषी-तंत्रज्ञान आणि ग्रामीण नवोन्मेषासाठी ₹५० लाखांपर्यंत अनुदान आणि बीज भांडवल उपलब्ध.'
          : 'Eligible agritech, biotechnology, and rural innovations can secure up to INR 50 Lakhs in seed grants and debt-linked commercialization capital.',
        content: '<p>Official Press Release details from AIC-ADT Baramati Foundation Communications Desk.</p>',
        category: 'OFFICIAL_ANNOUNCEMENT',
        publishDate: '2026-03-15T00:00:00.000Z',
        sourceAttribution: 'Institutional Communications Desk, AIC-ADT',
        externalPressLink: null,
        thumbnailAssetId: null,
        tags: ['SISFS', 'Seed Fund', 'Agritech', 'Cohort 4'],
        locale,
        isAvailableInLocale: true,
      },
      {
        id: 'seed-news-2',
        slug: 'nabl-analytical-testing-scope',
        headline: locale === 'mr'
          ? 'एनबीएएल (NABL) मान्यताप्राप्त अन्न चाचणी प्रयोगशाळेचा विस्तार'
          : 'NABL Analytical Testing Scope Expanded for Agri-Food Biotech Incubatees',
        summary: locale === 'mr'
          ? 'शेतमाल निर्यात चाचणीसाठी उच्च दर्जाची अत्याधुनिक प्रयोगशाळा कार्यान्वित.'
          : 'New high-resolution mass spectrometry and microbial screening pipelines operational at the Baramati biotechnology pilot park.',
        content: '<p>Full release regarding expanded laboratory infrastructure and certifications.</p>',
        category: 'INFRASTRUCTURE',
        publishDate: '2026-02-28T00:00:00.000Z',
        sourceAttribution: 'Bio-Analytical Core Facility, AIC-ADT',
        externalPressLink: null,
        thumbnailAssetId: null,
        tags: ['NABL', 'Testing Lab', 'Infrastructure', 'Export Quality'],
        locale,
        isAvailableInLocale: true,
      },
    ];

    let filtered = seedArticles;
    if (query.search) {
      const s = query.search.toLowerCase();
      filtered = filtered.filter((a) => a.headline.toLowerCase().includes(s) || a.summary.toLowerCase().includes(s));
    }

    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      data: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async getPublishedNewsBySlug(slug: string, locale: string = 'en'): Promise<PublicNewsArticleDto> {
    if (this.prisma.connected) {
      const article = await this.prisma.newsArticle.findUnique({
        where: { slug },
        include: {
          translations: {
            where: { locale, status: ContentStatus.PUBLISHED },
          },
        },
      });

      if (!article || article.translations.length === 0) {
        throw new NotFoundException(`Published news article with slug "${slug}" was not found in locale "${locale}".`);
      }

      const tr = article.translations[0];
      return {
        id: article.id,
        slug: article.slug,
        headline: tr.headline,
        summary: tr.summary,
        content: tr.content,
        category: article.category,
        publishDate: article.publishDate.toISOString(),
        sourceAttribution: article.sourceAttribution,
        externalPressLink: article.externalPressLink,
        thumbnailAssetId: article.thumbnailAssetId,
        tags: (tr.tags as string[]) || [],
        keyFacts: tr.keyFacts ? (tr.keyFacts as any) : undefined,
        locale,
        isAvailableInLocale: true,
      };
    }

    const list = await this.getPublishedNews({ locale, limit: 50 });
    const match = list.data.find((a) => a.slug === slug);
    if (!match) {
      throw new NotFoundException(`Published news article with slug "${slug}" was not found.`);
    }
    return match;
  }

  // ---------------------------------------------------------------------------
  // 2. PUBLIC EVENTS & WORKSHOPS
  // ---------------------------------------------------------------------------

  async getPublicEvents(query: QueryPublicContentDto): Promise<PaginatedPublicEventsDto> {
    const page = query.page || DEFAULT_PUBLIC_PAGE;
    const limit = query.limit || DEFAULT_PUBLIC_LIMIT;
    const skip = (page - 1) * limit;
    const locale = query.locale || 'en';

    if (this.prisma.connected) {
      const where: any = {
        translations: {
          some: {
            locale,
            status: ContentStatus.PUBLISHED,
          },
        },
      };

      if (query.category) {
        where.category = query.category;
      }

      const total = await this.prisma.event.count({ where });
      const events = await this.prisma.event.findMany({
        where,
        include: {
          translations: {
            where: { locale, status: ContentStatus.PUBLISHED },
          },
        },
        orderBy: { startDate: 'asc' },
        take: limit,
        skip,
      });

      const data: PublicEventDto[] = events.map((ev) => {
        const tr = ev.translations[0];
        return {
          id: ev.id,
          slug: ev.slug,
          title: tr?.title || 'Ecosystem Workshop',
          shortDescription: tr?.shortDescription || '',
          fullDescription: tr?.fullDescription || {},
          venueName: tr?.venueName || 'AIC-ADT Baramati Campus',
          venueAddress: tr?.venueAddress || 'Baramati, Pune, Maharashtra 413115',
          category: ev.category,
          eventStatus: ev.eventStatus,
          startDate: ev.startDate.toISOString(),
          endDate: ev.endDate.toISOString(),
          registrationDeadline: ev.registrationDeadline?.toISOString() || null,
          registrationUrl: ev.registrationUrl,
          bannerAssetId: ev.bannerAssetId,
          capacity: (ev as { capacity?: number | null }).capacity ?? null,
          targetAudience: (tr?.targetAudience as string[]) || [],
          agendaHighlights: tr?.agendaHighlights ? (tr.agendaHighlights as any) : undefined,
          locale,
          isAvailableInLocale: Boolean(tr),
        };
      });

      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      };
    }

    const seedEvents: PublicEventDto[] = [
      {
        id: 'seed-event-1',
        slug: 'drone-agronomy-masterclass-2026',
        title: locale === 'mr'
          ? 'ड्रोन अ‍ॅग्रोनॉमी प्रात्यक्षिक व प्रमाणपत्र कार्यशाळा'
          : 'Drone Agronomy & Remote Sensing Masterclass 2026',
        shortDescription: locale === 'mr'
          ? 'डीजीसीए (DGCA) प्रमाणित तज्ज्ञांकडून प्रत्यक्ष शेतात ड्रोन उड्डाण व वनस्पती आरोग्य विश्लेषण प्रशिक्षण.'
          : 'Hands-on flight demonstration, multispectral canopy NDVI mapping, and precision spraying protocols.',
        fullDescription: '<p>Comprehensive 2-day technical immersion led by licensed flight instructors.</p>',
        venueName: 'Precision Farming Pilot Grounds, AIC-ADT',
        venueAddress: 'KVK Farm, Malegaon Khurd, Baramati, Pune 413115',
        category: 'CAPACITY_BUILDING_WORKSHOP',
        eventStatus: 'OPEN_FOR_REGISTRATION',
        startDate: '2026-05-10T09:00:00.000Z',
        endDate: '2026-05-11T17:30:00.000Z',
        registrationDeadline: '2026-05-05T23:59:59.000Z',
        registrationUrl: 'https://aic-adt.in/apply/drone-masterclass',
        bannerAssetId: null,
        capacity: 40,
        targetAudience: ['Agritech Startups', 'Progressive Farmers', 'Agronomy Researchers'],
        locale,
        isAvailableInLocale: true,
      },
    ];

    return {
      data: seedEvents,
      total: seedEvents.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }

  async getPublicEventBySlug(slug: string, locale: string = 'en'): Promise<PublicEventDto> {
    if (this.prisma.connected) {
      const event = await this.prisma.event.findUnique({
        where: { slug },
        include: {
          translations: {
            where: { locale, status: ContentStatus.PUBLISHED },
          },
        },
      });

      if (!event || event.translations.length === 0) {
        throw new NotFoundException(`Published event with slug "${slug}" was not found in locale "${locale}".`);
      }

      const tr = event.translations[0];
      return {
        id: event.id,
        slug: event.slug,
        title: tr.title,
        shortDescription: tr.shortDescription,
        fullDescription: tr.fullDescription,
        venueName: tr.venueName,
        venueAddress: tr.venueAddress,
        category: event.category,
        eventStatus: event.eventStatus,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        registrationDeadline: event.registrationDeadline?.toISOString() || null,
        registrationUrl: event.registrationUrl,
        bannerAssetId: event.bannerAssetId,
        capacity: (event as { capacity?: number | null }).capacity ?? null,
        targetAudience: (tr.targetAudience as string[]) || [],
        agendaHighlights: tr.agendaHighlights ? (tr.agendaHighlights as any) : undefined,
        locale,
        isAvailableInLocale: true,
      };
    }

    const list = await this.getPublicEvents({ locale, limit: 50 });
    const match = list.data.find((e) => e.slug === slug);
    if (!match) {
      throw new NotFoundException(`Published event with slug "${slug}" was not found.`);
    }
    return match;
  }

  // ---------------------------------------------------------------------------
  // 3. PUBLIC PROGRAMS
  // ---------------------------------------------------------------------------

  async getPublicPrograms(query: QueryPublicContentDto): Promise<PaginatedPublicProgramsDto> {
    const locale = query.locale || 'en';
    const seedPrograms: PublicProgramDto[] = [
      {
        id: 'prog-incubation',
        slug: 'incubation',
        name: locale === 'mr' ? 'कृषी-तंत्रज्ञान इनक्युबेशन कार्यक्रम' : 'Agri-Tech & Allied Incubation Program',
        shortDescription: locale === 'mr'
          ? 'आरंभीच्या टप्प्यातील कृषी-स्टार्टअप्ससाठी १८ महिन्यांचे सर्वसमावेशक इनक्युबेशन.'
          : '18-month comprehensive incubation program providing laboratory pilot access, mentorship, and funding linkages.',
        fullDescription: 'Comprehensive incubation support for early-stage innovations across precision agriculture and bio-inputs.',
        focusAreas: ['Precision Agriculture', 'Bio-Stimulants', 'Cold-Chain IoT', 'Dairy Processing'],
        eligibilityCriteria: ['Incorporated Indian entity < 5 years old', 'Minimum working prototype / TRL 4+'],
        supportOfferings: ['NABL testing subsidies', 'KVK field validation trials', 'Seed grant facilitation'],
        durationMonths: 18,
        applicationStatus: 'OPEN',
        cohortSchedule: 'Batch 2026 Intake',
        locale,
      },
      {
        id: 'prog-pre-incubation',
        slug: 'pre-incubation',
        name: locale === 'mr' ? 'प्री-इनक्युबेशन नवोन्मेष कार्यक्रम' : 'Pre-Incubation Ideation Cohort',
        shortDescription: locale === 'mr'
          ? 'विद्यार्थी व तरुण संशोधकांच्या संकल्पनांचे प्रोटोटाईपमध्ये रूपांतर करण्यासाठी ६ महिन्यांचा कार्यक्रम.'
          : '6-month structured program taking proof-of-concept ideas to validated field prototypes.',
        fullDescription: 'Ideation acceleration with maker space and CAD lab access.',
        focusAreas: ['Farm Mechanization', 'Soil Sensing', 'Post-Harvest Value Addition'],
        eligibilityCriteria: ['Student teams, faculty researchers, or grassroots innovators'],
        supportOfferings: ['FabLab fabrication access', 'IP filing support', 'Technical mentorship'],
        durationMonths: 6,
        applicationStatus: 'OPEN',
        locale,
      },
    ];

    return {
      data: seedPrograms,
      total: seedPrograms.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }

  async getPublicProgramBySlug(slug: string, locale: string = 'en'): Promise<PublicProgramDto> {
    const programs = await this.getPublicPrograms({ locale });
    const match = programs.data.find((p) => p.slug === slug);
    if (!match) {
      throw new NotFoundException(`Published program with slug "${slug}" was not found.`);
    }
    return match;
  }

  // ---------------------------------------------------------------------------
  // 4. PUBLIC STARTUP PROFILES
  // ---------------------------------------------------------------------------

  async getPublicStartups(_query: QueryPublicContentDto): Promise<PaginatedPublicStartupsDto> {
    const seedStartups: PublicStartupDto[] = [
      {
        id: 'startup-gramheet',
        slug: 'gramheet',
        name: 'GramHeet',
        sector: 'Post-Harvest Agri-FinTech',
        incubationYear: 2022,
        cohort: 'Cohort 2',
        stage: 'Growth / Seed Funded',
        websiteUrl: 'https://gramheet.com',
        logoAssetId: null,
        oneLiner: 'Integrated village-level post-harvest warehousing, credit, and digital marketplace.',
        briefProfile: 'Empowers smallholder farmers with village-level storage access, instant digital commodity credit, and direct market linkage.',
        founders: ['Pankaj Mahalle', 'Shweta Thakare'],
        headquarters: 'Yavatmal & Baramati, Maharashtra',
      },
      {
        id: 'startup-innosapien',
        slug: 'innosapien',
        name: 'InnoSapien Agro',
        sector: 'Biological Pest Management',
        incubationYear: 2023,
        cohort: 'Cohort 3',
        stage: 'Field Pilot / Commercial',
        websiteUrl: 'https://innosapien.in',
        logoAssetId: null,
        oneLiner: 'Bio-rational pheromone delivery and organic bio-control formulations.',
        briefProfile: 'Specializes in targeted mating disruption dispensers and residue-free bio-inputs validated across sugarcane and pomegranate belts.',
        founders: ['Dr. Abhijit Joshi'],
        headquarters: 'Baramati, Maharashtra',
      },
    ];

    return {
      data: seedStartups,
      total: seedStartups.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }

  async getPublicStartupBySlug(slug: string): Promise<PublicStartupDto> {
    const list = await this.getPublicStartups({});
    const match = list.data.find((s) => s.slug === slug);
    if (!match) {
      throw new NotFoundException(`Public startup profile for slug "${slug}" was not found.`);
    }
    return match;
  }

  // ---------------------------------------------------------------------------
  // 5. PUBLIC PUBLICATIONS & REPORTS
  // ---------------------------------------------------------------------------

  async getPublicPublications(_query: QueryPublicContentDto): Promise<PaginatedPublicPublicationsDto> {
    const seedDocs: PublicPublicationDto[] = [
      {
        id: 'pub-annual-report-2024-25',
        slug: 'annual-report-2024-25',
        title: 'AIC-ADT Baramati Foundation Annual Statutory Impact Report (2024–25)',
        summary: 'Comprehensive statutory filing documenting incubatee cohorts, NITI Aayog milestones, capital deployment, and farmer impact outreach.',
        publicationType: 'ANNUAL_REPORT',
        reportingPeriod: 'FY 2024–25',
        publishDate: '2025-09-30T00:00:00.000Z',
        isStatutory: true,
        fileSizeBytes: 4850000,
        fileExtension: 'pdf',
        downloadUrl: '/api/v1/public/publications/annual-report-2024-25/download',
      },
    ];

    return {
      data: seedDocs,
      total: seedDocs.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }

  async getPublicPublicationBySlug(slug: string): Promise<PublicPublicationDto> {
    const list = await this.getPublicPublications({});
    const match = list.data.find((d) => d.slug === slug);
    if (!match) {
      throw new NotFoundException(`Publication with slug "${slug}" was not found.`);
    }
    return match;
  }

  // ---------------------------------------------------------------------------
  // 6. PUBLISHED INSTITUTIONAL PAGES
  // ---------------------------------------------------------------------------

  async getPublishedPageBySlug(slug: string, locale: string = 'en'): Promise<PublicInstitutionalPageDto> {
    const pages: Record<string, PublicInstitutionalPageDto> = {
      about: {
        id: 'page-about',
        slug: 'about',
        title: locale === 'mr' ? 'आमच्याबद्दल (AIC-ADT बारामती)' : 'About AIC-ADT Baramati Foundation',
        summary: 'Pioneering agricultural and biotechnology innovation supported by AIM, NITI Aayog and Agricultural Development Trust Baramati.',
        content: 'Official institutional charter, leadership governance, and core mandates.',
        locale,
        updatedAt: '2026-03-01T00:00:00.000Z',
      },
    };

    const match = pages[slug];
    if (!match) {
      throw new NotFoundException(`Published institutional page "${slug}" was not found.`);
    }
    return match;
  }

  // ---------------------------------------------------------------------------
  // 7. PUBLIC MEDIA METADATA
  // ---------------------------------------------------------------------------

  async getPublicMedia(id: string): Promise<PublicMediaAssetDto> {
    if (this.prisma.connected) {
      const asset = await this.prisma.mediaAsset.findUnique({
        where: { id },
      });

      if (!asset) {
        throw new NotFoundException(`Media asset with ID "${id}" was not found.`);
      }

      // Enforce visibility rule: never deliver private or archived media to public
      if (asset.visibility !== MediaVisibility.PUBLIC) {
        throw new NotFoundException(`Media asset "${id}" is not available for public distribution.`);
      }

      return {
        id: asset.id,
        originalName: asset.originalName,
        publicUrl: asset.publicUrl || `/api/v1/public/media/${asset.id}/file`,
        mimeType: asset.mimeType,
        fileSizeBytes: asset.fileSizeBytes,
        mediaType: asset.mediaType,
        width: asset.width,
        height: asset.height,
        altText: asset.altTextEn || asset.originalName,
        caption: asset.caption,
        attribution: asset.attribution,
        createdAt: asset.createdAt.toISOString(),
      };
    }

    return {
      id,
      originalName: 'aic-adt-emblem.png',
      publicUrl: `/images/aic-adt-emblem.png`,
      mimeType: 'image/png',
      fileSizeBytes: 125000,
      mediaType: 'IMAGE',
      width: 400,
      height: 400,
      altText: 'AIC-ADT Baramati Foundation Official Emblem',
      caption: 'Official institutional mark',
      attribution: 'AIC-ADT Baramati Foundation',
      createdAt: new Date().toISOString(),
    };
  }
}
