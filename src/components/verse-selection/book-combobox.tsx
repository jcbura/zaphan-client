'use client';

import { Book, useGetBooksQuery } from '@/api';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setBook, verseSelectionSelectors } from '@/stores';

export const BookCombobox = () => {
  const dispatch = useAppDispatch();
  const bookId = useAppSelector(verseSelectionSelectors.bookId);

  const { data, isLoading } = useGetBooksQuery({});

  const books = data?.result ?? [];
  const selectedBook = books.find((b) => b.id === bookId) ?? null;

  return (
    <Combobox
      autoHighlight
      items={books}
      value={selectedBook}
      onValueChange={(book: Book | null) => {
        dispatch(setBook(book?.id ?? null));
      }}
      itemToStringValue={(book: Book) => book.name}
      itemToStringLabel={(book: Book) => book.name}
    >
      <ComboboxInput
        className="max-w-45"
        placeholder={isLoading ? 'Loading books…' : 'Select a book'}
        disabled={isLoading}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No books found.</ComboboxEmpty>
        <ComboboxList>
          {(book: Book) => (
            <ComboboxItem key={book.id} value={book}>
              {book.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
