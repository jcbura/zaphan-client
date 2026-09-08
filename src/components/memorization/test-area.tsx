'use client';

import { BlankInput, P } from '@/components';
import { useAppSelector } from '@/hooks';
import { memorizationSelectors } from '@/stores';

export const TestArea = () => {
  const segments = useAppSelector(memorizationSelectors.segments);

  return (
    <P font="serif" render={<div />}>
      {segments.map((segment, index) => {
        if (!segment.blanked) {
          return <span key={index}>{segment.text}</span>;
        }

        return <BlankInput key={index} index={index} />;
      })}
    </P>
  );
};
