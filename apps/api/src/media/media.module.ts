import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { MediaController } from './media.controller.js';
import { MediaService } from './media.service.js';
import { LocalStorageService } from './storage/local-storage.service.js';
import { STORAGE_SERVICE_TOKEN } from './storage/storage.interface.js';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    LocalStorageService,
    {
      provide: STORAGE_SERVICE_TOKEN,
      useClass: LocalStorageService,
    },
  ],
  exports: [MediaService, STORAGE_SERVICE_TOKEN],
})
export class MediaModule {}
