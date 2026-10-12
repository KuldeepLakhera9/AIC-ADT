import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { PermissionsGuard } from '../auth/guards/permissions.guard.js';
import { RequirePermissions } from '../auth/decorators/require-permissions.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Permission } from '../auth/auth.types.js';
import type { AuthUserDto } from '../auth/dto/auth-user.dto.js';
import { MediaService } from './media.service.js';
import { UploadMediaDto } from './dto/upload-media.dto.js';
import { UpdateMediaDto } from './dto/update-media.dto.js';
import { QueryMediaDto } from './dto/query-media.dto.js';
import type {
  MediaAssetResponseDto,
  PaginatedMediaResponseDto,
} from './dto/media-response.dto.js';

export interface UploadedMediaFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Controller('media')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @RequirePermissions(Permission.MEDIA_READ)
  async findAll(
    @Query() query: QueryMediaDto,
  ): Promise<PaginatedMediaResponseDto> {
    return this.mediaService.findAll(query);
  }

  @Get(':id')
  @RequirePermissions(Permission.MEDIA_READ)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MediaAssetResponseDto> {
    return this.mediaService.findOne(id);
  }

  @Post('upload')
  @RequirePermissions(Permission.MEDIA_UPLOAD)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB upper bound
      },
    }),
  )
  async upload(
    @UploadedFile() file: UploadedMediaFile | undefined,
    @Body() dto: UploadMediaDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<MediaAssetResponseDto> {
    if (!file) {
      throw new BadRequestException('A file payload must be provided under field "file".');
    }
    return this.mediaService.upload(file, dto, user);
  }

  @Put(':id')
  @RequirePermissions(Permission.MEDIA_UPDATE)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMediaDto,
    @CurrentUser() user: AuthUserDto,
  ): Promise<MediaAssetResponseDto> {
    return this.mediaService.update(id, dto, user);
  }

  @Delete(':id')
  @RequirePermissions(Permission.MEDIA_DELETE)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthUserDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.mediaService.delete(id, user);
  }

  @Get(':id/download')
  @RequirePermissions(Permission.MEDIA_READ)
  async download(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ): Promise<void> {
    const { stream, filename, mimeType, fileSizeBytes } =
      await this.mediaService.getFileStreamForDownload(id);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', fileSizeBytes);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(filename)}"`,
    );

    stream.pipe(res);
  }
}
