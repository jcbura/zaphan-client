'use client';

import { P } from '@/components';
import { useAppSelector } from '@/hooks';
import { memorizationSelectors } from '@/stores';

export const TestScore = () => {
  const isSubmitted = useAppSelector(memorizationSelectors.isSubmitted);
  const score = useAppSelector(memorizationSelectors.score);

  if (!isSubmitted) {
    return null;
  }

  return (
    <P variant="muted" className="text-xs tabular-nums">
      {score.correct} of {score.total} correct ·{' '}
      {Math.round(score.percent * 100)}%
    </P>
  );
};
