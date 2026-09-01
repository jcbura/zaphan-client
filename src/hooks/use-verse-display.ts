'use client';

import { useGetVersesQuery } from '@/api';
import { useAppSelector } from '@/hooks/rtk-hooks';
import {
  prepareVerseText,
  resolveVerseScope,
  verseScopeKey,
} from '@/memorization';
import { verseSelectionSelectors } from '@/stores';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

export const useVerseDisplay = () => {
  const translation = useAppSelector(verseSelectionSelectors.translation);
  const bookId = useAppSelector(verseSelectionSelectors.bookId);
  const chapterNumber = useAppSelector(verseSelectionSelectors.chapterNumber);
  const startVerse = useAppSelector(verseSelectionSelectors.startVerse);
  const endVerse = useAppSelector(verseSelectionSelectors.endVerse);

  const scope = useMemo(
    () =>
      resolveVerseScope({
        translation,
        bookId,
        chapterNumber,
        startVerse,
        endVerse,
      }),
    [translation, bookId, chapterNumber, startVerse, endVerse],
  );

  const scopeKey = verseScopeKey(scope);

  const { currentData, isLoading, isFetching, isError } = useGetVersesQuery(
    scope.kind !== 'none' ? scope.fetchArgs : skipToken,
  );

  const displayText = useMemo(() => {
    if (scope.kind === 'none') return null;
    const verses = currentData?.result;
    if (!verses?.length) return null;
    return prepareVerseText(verses);
  }, [scope.kind, currentData?.result]);

  return {
    scope,
    scopeKey,
    displayText,
    isLoading,
    isFetching,
    isError,
  };
};
