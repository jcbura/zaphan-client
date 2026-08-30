export interface ApiResponse<T> {
  timestamp: string;
  path: string;
  statusCode: number;
  message: string;
  result: T;
}

export type BookIdParam = { bookId: number };
export type ChapterNumberParam = { chapterNumber: number };
export type TranslationIdParam = { translationId: number };
export type VerseNumberParam = { verseNumber: number };
