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
    <section className="mt-6 flex flex-wrap items-center gap-4 md:flex-nowrap">
      <TranslationCombobox />
      <BookCombobox />
      <ChapterCombobox />
      <VerseCombobox isStart />
      <VerseCombobox />
      <DifficultyInput />
    </section>
  );
};
