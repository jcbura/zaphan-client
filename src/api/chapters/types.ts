import { BookIdParam, BookLite, ChapterNumberParam } from '@/api';

export type GetChaptersArguments = BookIdParam;

export type GetChapterArguments = BookIdParam & ChapterNumberParam;

export type Chapter = {
  id: number;
  chapterNumber: number;
  book: BookLite;
};

export type ChapterLite = Omit<Chapter, 'book'>;
