import type { Verse } from '@/api';

export const prepareVerseText = (verses: Verse[]): string =>
  [...verses]
    .sort((a, b) => a.verseNumber - b.verseNumber)
    .map((verse) => verse.text)
    .join(' ');
