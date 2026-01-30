import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import type { CreateNoteDto, UpdateNoteDto } from './misc/notes.types';

import { PrismaService } from '@/modules/auth/infrastructure/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllNotes(userId: string) {
    const notes = await this.prisma.note.findMany({
      where: { userId: userId },
    });

    return notes;
  }

  async getNoteById(userId: string, noteId: string) {
    const notes = await this.prisma.note.findFirst({
      where: { id: noteId, userId: userId },
    });
    if (!notes) throw new NotFoundException('NO_NOTES_FOUND');
    return notes;
  }

  async addNote(userId: string, dto: CreateNoteDto) {
    const note = await this.prisma.note.create({
      data: {
        userId,
        title: dto.title ?? (dto.content?.slice(0, 20) || 'Untitled'),
        content: dto.content ?? '',
      },
    });
    return note;
  }

  async update(userId: string, noteId: string, dto: UpdateNoteDto) {
    const exists = await this.prisma.note.findFirst({
      where: { id: noteId, userId: userId },
    });
    if (!exists) throw new NotFoundException('NOTE_NOT_FOUND');
    const data: Prisma.NoteUpdateInput = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.content !== undefined) data.content = dto.content;
    const updated = await this.prisma.note.update({
      where: { id: noteId, userId },
      data,
    });
    return updated;
  }

  async delete(noteId: string, userId: string) {
    await this.prisma.note.delete({
      where: { id: noteId, userId },
    });
    return { id: noteId };
  }
}
