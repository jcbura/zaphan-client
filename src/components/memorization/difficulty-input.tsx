'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  memorizationSelectors,
  setDifficulty,
  verseSelectionSelectors,
} from '@/stores';
import { useCallback, useState } from 'react';

export const DifficultyInput = () => {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector(memorizationSelectors.difficulty);
  const translation = useAppSelector(verseSelectionSelectors.translation);
  const bookId = useAppSelector(verseSelectionSelectors.bookId);
  const chapterNumber = useAppSelector(verseSelectionSelectors.chapterNumber);

  const isDisabled =
    translation === null || bookId === null || chapterNumber === null;

  const [draft, setDraft] = useState<string | null>(null);

  const displayValue = isDisabled
    ? ''
    : (draft ?? (difficulty === null ? '' : String(difficulty)));

  const commitDifficulty = useCallback(() => {
    if (isDisabled) {
      setDraft(null);
      return;
    }

    const current = draft ?? (difficulty === null ? '' : String(difficulty));
    setDraft(null);

    if (current === '') {
      dispatch(setDifficulty(null));
      return;
    }

    const number = Number(current);
    const clamped = Math.min(100, Math.max(0, number));

    if (clamped <= 0) {
      dispatch(setDifficulty(null));
      return;
    }

    dispatch(setDifficulty(clamped));
  }, [dispatch, draft, difficulty, isDisabled]);

  return (
    <InputGroup className="hover:bg-muted dark:hover:bg-muted/50 rounded-none rounded-tl rounded-tr border-t-0 border-r-0 border-b border-l-0 bg-transparent sm:max-w-45 dark:bg-transparent">
      <InputGroupInput
        placeholder="select difficulty"
        type="number"
        min={0}
        max={100}
        step={5}
        value={displayValue}
        disabled={isDisabled}
        onFocus={() => {
          setDraft(difficulty === null ? '' : String(difficulty));
        }}
        onChange={(event) => {
          setDraft(event.target.value);
        }}
        onBlur={commitDifficulty}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return;

          event.preventDefault();
          commitDifficulty();
        }}
      />
      <InputGroupAddon align="inline-end">%</InputGroupAddon>
    </InputGroup>
  );
};
