'use client';

import { Chapter, useGetChaptersQuery } from '@/api';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setChapter, verseSelectionSelectors } from '@/stores';

export const ChapterCombobox = () => {
  const dispatch = useAppDispatch();
  const bookId = useAppSelector(verseSelectionSelectors.bookId);
  const chapterNumber = useAppSelector(verseSelectionSelectors.chapterNumber);

  const { data, isLoading } = useGetChaptersQuery(
    { bookId: bookId! },
    { skip: !bookId },
  );

  const chapters = data?.result ?? [];
  const selectedChapter =
    chapters.find((c) => c.chapterNumber === chapterNumber) ?? null;

  return (
    <Combobox
      autoHighlight
      items={chapters}
      value={selectedChapter}
      onValueChange={(chapter: Chapter | null) => {
        dispatch(setChapter(chapter?.chapterNumber ?? null));
      }}
      itemToStringValue={(chapter: Chapter) => String(chapter.chapterNumber)}
      itemToStringLabel={(chapter: Chapter) => String(chapter.chapterNumber)}
      disabled={!bookId}
    >
      <ComboboxInput
        className="max-w-45"
        placeholder={isLoading ? 'Loading chapters…' : 'Select chapter'}
        disabled={!bookId || isLoading}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No chapters found.</ComboboxEmpty>
        <ComboboxList>
          {(chapter: Chapter) => (
            <ComboboxItem key={chapter.chapterNumber} value={chapter}>
              {chapter.chapterNumber}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
