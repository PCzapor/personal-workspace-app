import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { AccessGuard } from '../auth/infrastructure/guard/auth.guard';

import { LinksService } from './links.service';
import {
  CreateLinkDto,
  UpdateLinkDto,
  SavedLinkResponse,
} from './misc/links.types';

@Controller('links')
export class LinksController {
  constructor(private readonly links: LinksService) {}

  @Get()
  @UseGuards(AccessGuard)
  async getAllLinks(@Req() req: Request): Promise<SavedLinkResponse[]> {
    const { userId } = req.auth!;
    return this.links.getAllLinks(userId);
  }

  @Get(':id')
  @UseGuards(AccessGuard)
  async getLink(
    @Req() req: Request,
    @Param('id') linkId: string,
  ): Promise<SavedLinkResponse> {
    const { userId } = req.auth!;
    return this.links.getLinkById(userId, linkId);
  }

  @Post()
  @UseGuards(AccessGuard)
  async createLink(
    @Req() req: Request,
    @Body() dto: CreateLinkDto,
  ): Promise<SavedLinkResponse> {
    const { userId } = req.auth!;
    return this.links.createLink(userId, dto);
  }

  @Patch(':id')
  @UseGuards(AccessGuard)
  async updateLink(
    @Req() req: Request,
    @Param('id') linkId: string,
    @Body() dto: UpdateLinkDto,
  ): Promise<SavedLinkResponse> {
    const { userId } = req.auth!;
    return this.links.updateLink(userId, linkId, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AccessGuard)
  async deleteLink(
    @Req() req: Request,
    @Param('id') linkId: string,
  ): Promise<void> {
    const { userId } = req.auth!;
    return this.links.deleteLink(userId, linkId);
  }
}
