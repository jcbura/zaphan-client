import {
  BookIdParam,
  BookLite,
  ChapterLite,
  ChapterNumberParam,
  Translation,
  VerseNumberParam,
} from '@/api';

export type GetVersesArguments = BookIdParam &
  ChapterNumberParam & {
    translation: string;
    start?: number;
    end?: number;
  };

export type GetVerseArguments = BookIdParam &
  ChapterNumberParam &
  VerseNumberParam & {
    translation: string;
  };

export type Verse = {
  id: number;
  verseNumber: number;
  text: string;
  translation: Translation;
  chapter: ChapterLite;
  book: BookLite;
};
