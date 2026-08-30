'use client';

import { useGetVersesQuery, Verse } from '@/api';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setVerseEnd, setVerseStart, verseSelectionSelectors } from '@/stores';

interface Props {
  isStart?: boolean;
}

export const VerseCombobox = ({ isStart = false }: Props) => {
  const dispatch = useAppDispatch();
  const bookId = useAppSelector(verseSelectionSelectors.bookId);
  const chapterNumber = useAppSelector(verseSelectionSelectors.chapterNumber);
  const translation = useAppSelector(verseSelectionSelectors.translation);
  const verseStart = useAppSelector(verseSelectionSelectors.verseStart);
  const verseEnd = useAppSelector(verseSelectionSelectors.verseEnd);

  const { data, isLoading } = useGetVersesQuery(
    {
      bookId: bookId!,
      chapterNumber: chapterNumber!,
      translation: translation!,
    },
    { skip: !bookId || !chapterNumber || !translation },
  );

  const allVerses = data?.result ?? [];
  const options = isStart
    ? allVerses
    : allVerses.filter(
        (v) => verseStart === null || v.verseNumber >= verseStart,
      );

  const selectedNumber = isStart ? verseStart : verseEnd;
  const selectedVerse =
    options.find((v) => v.verseNumber === selectedNumber) ?? null;

  const disabled = isStart ? !chapterNumber || !translation : !verseStart;

  return (
    <Combobox
      autoHighlight
      items={options}
      value={selectedVerse}
      onValueChange={(verse: Verse | null) => {
        if (isStart) {
          dispatch(setVerseStart(verse?.verseNumber ?? null));
        } else {
          dispatch(setVerseEnd(verse?.verseNumber ?? null));
        }
      }}
      itemToStringValue={(verse: Verse) => String(verse.verseNumber)}
      itemToStringLabel={(verse: Verse) => String(verse.verseNumber)}
      disabled={disabled}
    >
      <ComboboxInput
        className="max-w-45"
        placeholder={isLoading ? 'Loading verses…' : 'Select a verse'}
        disabled={disabled || isLoading}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No verses found.</ComboboxEmpty>
        <ComboboxList>
          {(verse: Verse) => (
            <ComboboxItem key={verse.verseNumber} value={verse}>
              {verse.verseNumber}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
