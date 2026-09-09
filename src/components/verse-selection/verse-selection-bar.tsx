'use client';

import {
  BookCombobox,
  ChapterCombobox,
  DifficultyInput,
  TranslationCombobox,
  VerseCombobox,
} from '@/components';

export const VerseSelectionBar = () => {
  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap">
      <TranslationCombobox />
      <BookCombobox />
      <ChapterCombobox />
      <VerseCombobox isStart />
      <VerseCombobox />
      <DifficultyInput />
    </div>
  );
};
