import type { GetVersesArguments } from '@/api';

export type VerseSelectionInput = {
  translation: string | null;
  bookId: number | null;
  chapterNumber: number | null;
  startVerse: number | null;
  endVerse: number | null;
};

export type VerseScope =
  | { kind: 'none' }
  | {
      kind: 'chapter' | 'single' | 'range';
      fetchArgs: GetVersesArguments;
    };

export const resolveVerseScope = (
  selection: VerseSelectionInput,
): VerseScope => {
  const { translation, bookId, chapterNumber, startVerse, endVerse } =
    selection;

  if (translation === null || bookId === null || chapterNumber === null) {
    return { kind: 'none' };
  }

  const base = { translation, bookId, chapterNumber };

  if (startVerse !== null && endVerse !== null) {
    return {
      kind: 'range',
      fetchArgs: { ...base, start: startVerse, end: endVerse },
    };
  }

  if (startVerse !== null) {
    return {
      kind: 'single',
      fetchArgs: { ...base, start: startVerse, end: startVerse },
    };
  }

  return { kind: 'chapter', fetchArgs: base };
};

export const verseScopeKey = (scope: VerseScope): string | null => {
  if (scope.kind === 'none') return null;

  const { translation, bookId, chapterNumber, start, end } = scope.fetchArgs;
  const chapterKey = `${translation}:${bookId}:${chapterNumber}`;

  if (scope.kind === 'chapter') return chapterKey;
  if (scope.kind === 'single') return `${chapterKey}:${start}`;
  return `${chapterKey}:${start}-${end}`;
};
