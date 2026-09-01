'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { memorizationSelectors, setDifficulty } from '@/stores';
import { useState } from 'react';

export const DifficultyInput = () => {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector(memorizationSelectors.difficulty);

  const [value, setValue] = useState(String(difficulty));

  return (
    <InputGroup className="hover:bg-muted dark:hover:bg-muted/50 max-w-45 rounded-none rounded-tl rounded-tr border-t-0 border-r-0 border-b border-l-0 bg-transparent dark:bg-transparent">
      <InputGroupInput
        placeholder="select difficulty"
        type="number"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onBlur={() => {
          if (value === '') {
            dispatch(setDifficulty(null));
            return;
          }

          const number = Number(value);

          const clamped = Math.min(100, Math.max(0, number));

          setValue(String(clamped));
          dispatch(setDifficulty(clamped));
        }}
      />
      <InputGroupAddon align="inline-end">%</InputGroupAddon>
    </InputGroup>
  );
};
