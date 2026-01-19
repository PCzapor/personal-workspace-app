import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/auth/infrastructure/prisma/prisma.service';
import { DashboardSummary } from './misc/dashboard.types';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(userId: string): Promise<DashboardSummary> {
    const [notesCount, linksCount, recentNotes, recentLinks] = await Promise.all([
      this.prisma.note.count({ where: { userId } }),
      this.prisma.savedLink.count({ where: { userId } }),
      this.prisma.note.findMany({
        where: { userId },
        select: { id: true, title: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 3,
      }),
      this.prisma.savedLink.findMany({
        where: { userId },
        select: { id: true, url: true, title: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
    ]);

    return {
      notesCount,
      linksCount,
      recentNotes: recentNotes.map((note) => ({
        id: note.id,
        title: note.title,
        updatedAt: note.updatedAt.toISOString(),
      })),
      recentLinks: recentLinks.map((link) => ({
        id: link.id,
        url: link.url,
        title: link.title,
        createdAt: link.createdAt.toISOString(),
      })),
    };
  }
}
