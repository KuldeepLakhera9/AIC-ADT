import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news.controller.js';
import { NewsService } from './services/news.service.js';
import { DatabaseModule } from '../database/database.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class ContentModule {}
