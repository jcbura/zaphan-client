import { BookIdParam } from '@/api';

export type GetBooksArguments = {
  testament?: Testament;
};

export type GetBookArguments = BookIdParam;

export type Testament = 'OLD' | 'NEW';

export type Book = {
  id: number;
  name: string;
  testament: Testament;
  bookOrder: number;
};

export type BookLite = Omit<Book, 'bookOrder'>;
