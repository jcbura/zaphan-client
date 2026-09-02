'use client';

import { useGetVersesQuery } from '@/api';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk-hooks';
import {
  buildBlankedSegments,
  prepareVerseText,
  resolveVerseScope,
  verseScopeKey,
} from '@/memorization';
import {
  clearTest,
  memorizationSelectors,
  retryTest,
  revealAllBlanks,
  revealBlank,
  setDifficulty,
  setInput,
  startTest,
  submitAnswers,
  verseSelectionSelectors,
} from '@/stores';
import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useMemo } from 'react';

export const useMemorizationSession = () => {
  const dispatch = useAppDispatch();

  const translation = useAppSelector(verseSelectionSelectors.translation);
  const bookId = useAppSelector(verseSelectionSelectors.bookId);
  const chapterNumber = useAppSelector(verseSelectionSelectors.chapterNumber);
  const startVerse = useAppSelector(verseSelectionSelectors.startVerse);
  const endVerse = useAppSelector(verseSelectionSelectors.endVerse);

  const difficulty = useAppSelector(memorizationSelectors.difficulty);
  const segments = useAppSelector(memorizationSelectors.segments);
  const testState = useAppSelector(memorizationSelectors.testState);
  const score = useAppSelector(memorizationSelectors.score);
  const isTestActive = useAppSelector(memorizationSelectors.isTestActive);
  const canSubmit = useAppSelector(memorizationSelectors.canSubmit);
  const canReset = useAppSelector(memorizationSelectors.canReset);
  const canRevealAll = useAppSelector(memorizationSelectors.canRevealAll);

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

  useEffect(() => {
    dispatch(clearTest());
    dispatch(setDifficulty(null));
  }, [dispatch, scopeKey]);

  const { currentData, isLoading, isFetching, isError } = useGetVersesQuery(
    scope.kind !== 'none' ? scope.fetchArgs : skipToken,
  );

  const displayText = useMemo(() => {
    if (scope.kind === 'none') return null;
    const verses = currentData?.result;
    if (!verses?.length) return null;
    return prepareVerseText(verses);
  }, [scope.kind, currentData?.result]);

  const canTest =
    scope.kind !== 'none' &&
    difficulty !== null &&
    difficulty > 0 &&
    displayText !== null;

  useEffect(() => {
    if (!canTest || !displayText || difficulty === null) {
      dispatch(clearTest());
      return;
    }
    dispatch(startTest(buildBlankedSegments(displayText, difficulty)));
  }, [canTest, difficulty, dispatch, displayText]);

  const resetTest = useCallback(() => {
    if (!displayText || difficulty === null || !canReset) return;
    dispatch(retryTest(buildBlankedSegments(displayText, difficulty)));
  }, [canReset, difficulty, dispatch, displayText]);

  const submitTest = useCallback(() => {
    dispatch(submitAnswers());
  }, [dispatch]);

  const revealAll = useCallback(() => {
    dispatch(revealAllBlanks());
  }, [dispatch]);

  const revealBlankAt = useCallback(
    (index: number) => {
      dispatch(revealBlank(index));
    },
    [dispatch],
  );

  const setBlankInput = useCallback(
    (index: number, value: string) => {
      dispatch(setInput({ index, value }));
    },
    [dispatch],
  );

  return {
    scope,
    scopeKey,
    displayText,
    difficulty,
    segments,
    testState,
    score,
    isTestActive,
    canTest,
    canSubmit,
    canReset,
    canRevealAll,
    isLoading,
    isFetching,
    isError,
    resetTest,
    submitTest,
    revealAll,
    revealBlank: revealBlankAt,
    setBlankInput,
  };
};
