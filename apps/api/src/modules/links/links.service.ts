import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SavedLink } from '@prisma/client';

import { LinksErrorCode } from './misc/links.errors';
import {
  CreateLinkDto,
  UpdateLinkDto,
  SavedLinkResponse,
} from './misc/links.types';

import { PrismaService } from '@/modules/auth/infrastructure/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLinks(userId: string): Promise<SavedLinkResponse[]> {
    const links = await this.prisma.savedLink.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return links.map((l) => this.formatLink(l));
  }

  async getLinkById(
    userId: string,
    linkId: string,
  ): Promise<SavedLinkResponse> {
    const link = await this.prisma.savedLink.findFirst({
      where: { id: linkId, userId },
    });

    if (!link) {
      throw new NotFoundException(LinksErrorCode.LINK_NOT_FOUND);
    }

    return this.formatLink(link);
  }

  async createLink(
    userId: string,
    dto: CreateLinkDto,
  ): Promise<SavedLinkResponse> {
    const url = dto.url.trim();
    const link = await this.prisma.savedLink.create({
      data: {
        userId,
        url,
        title: dto.title?.trim() || null,
        description: dto.description?.trim() || null,
      },
    });
    return this.formatLink(link);
  }

  async updateLink(
    userId: string,
    linkId: string,
    dto: UpdateLinkDto,
  ): Promise<SavedLinkResponse> {
    const existing = await this.prisma.savedLink.findFirst({
      where: { id: linkId, userId },
    });

    if (!existing) {
      throw new NotFoundException(LinksErrorCode.LINK_NOT_FOUND);
    }

    const updateData: Prisma.SavedLinkUpdateInput = {};
    if (dto.title !== undefined) {
      updateData.title = dto.title.trim() || null;
    }
    if (dto.description !== undefined) {
      updateData.description = dto.description.trim() || null;
    }

    const updated = await this.prisma.savedLink.update({
      where: { id: linkId },
      data: updateData,
    });

    return this.formatLink(updated);
  }

  async deleteLink(userId: string, linkId: string): Promise<void> {
    const link = await this.prisma.savedLink.findFirst({
      where: { id: linkId, userId },
    });

    if (!link) {
      throw new NotFoundException(LinksErrorCode.LINK_NOT_FOUND);
    }

    await this.prisma.savedLink.delete({
      where: { id: linkId },
    });
  }

  private formatLink(link: SavedLink): SavedLinkResponse {
    return {
      id: link.id,
      url: link.url,
      title: link.title,
      description: link.description,
      createdAt: link.createdAt.toISOString(),
      updatedAt: link.updatedAt.toISOString(),
    };
  }
}
