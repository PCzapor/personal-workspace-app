import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/modules/auth/infrastructure/prisma/prisma.service';
import { CreateLinkDto, UpdateLinkDto, SavedLinkResponse } from './misc/links.types';
import { LinksErrorCode } from './misc/links.errors';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLinks(userId: string): Promise<SavedLinkResponse[]> {
    const links = await this.prisma.savedLink.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return links.map(this.formatLink);
  }

  async getLinkById(userId: string, linkId: string): Promise<SavedLinkResponse> {
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

    try {
      const link = await this.prisma.savedLink.create({
        data: {
          userId,
          url,
          title: dto.title?.trim() || null,
          description: dto.description?.trim() || null,
        },
      });
      return this.formatLink(link);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('userId') &&
        error.meta?.target?.includes('url')
      ) {
        throw new ConflictException(LinksErrorCode.LINK_ALREADY_EXISTS);
      }
      throw error;
    }
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

    const updateData: any = {};
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

  private formatLink(link: any): SavedLinkResponse {
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
