import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';

import { AccessGuard } from '../auth/infrastructure/guard/auth.guard';

import { DashboardService } from './dashboard.service';
import { DashboardSummary } from './misc/dashboard.types';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('summary')
  @UseGuards(AccessGuard)
  async getSummary(@Req() req: Request): Promise<DashboardSummary> {
    const { userId } = req.auth!;
    return this.dashboard.getSummary(userId);
  }
}
