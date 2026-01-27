import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AccessGuard } from '../auth/infrastructure/guard/auth.guard';
import { NotesService } from './notes.service';
import { Note } from '@prisma/client';
import type { CreateNoteDto, UpdateNoteDto } from './misc/notes.types';
import { AuthService } from '../auth/auth.service';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notes: NotesService,
    private readonly auth: AuthService,
  ) {}

  @Get()
  @UseGuards(AccessGuard)
  async get_all_notes(@Req() req: Request): Promise<Note[]> {
    const { userId } = req.auth!;
    const result = await this.notes.getAllNotes(userId);
    return result;
  }

  @Get(':id')
  @UseGuards(AccessGuard)
  async getNote(
    @Req() req: Request,
    @Param('id') noteId: string,
  ): Promise<Note> {
    const { userId } = req.auth!;
    return await this.notes.getNoteById(userId, noteId);
  }

  @Post()
  @UseGuards(AccessGuard)
  async create(@Req() req: Request, @Body() dto: CreateNoteDto): Promise<Note> {
    const { userId } = req.auth!;
    return await this.notes.addNote(userId, dto);
  }

  @Patch(':id')
  @UseGuards(AccessGuard)
  async update(
    @Req() req: Request,
    @Param('id') noteId: string,
    @Body() dto: UpdateNoteDto,
  ): Promise<Note> {
    const { userId } = req.auth!;
    return await this.notes.update(userId, noteId, dto);
  }

  @Delete(':id')
  @UseGuards(AccessGuard)
  async delete(
    @Req() req: Request,
    @Param('id') noteId: string,
  ): Promise<{ id: string }> {
    const { userId } = req.auth!;
    return await this.notes.delete(noteId, userId);
  }
}
