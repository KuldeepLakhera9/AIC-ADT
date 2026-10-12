import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service.js';
import { WorkflowController } from './workflow.controller.js';
import { DatabaseModule } from '../database/database.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [WorkflowController],
  providers: [WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
