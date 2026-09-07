'use client';

import { Button } from '@/components';

type TestActionBarProps = {
  canSubmit: boolean;
  canReset: boolean;
  canRevealAll: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onRevealAll: () => void;
};

export const TestActionBar = ({
  canSubmit,
  canReset,
  canRevealAll,
  onSubmit,
  onReset,
  onRevealAll,
}: TestActionBarProps) => {
  return (
    <footer className="mt-6 flex flex-wrap items-center gap-4 border-t pt-6 md:flex-nowrap md:justify-end">
      <Button type="button" onClick={onSubmit} disabled={!canSubmit}>
        submit
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={!canReset}
      >
        reset
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onRevealAll}
        disabled={!canRevealAll}
      >
        reveal all
      </Button>
    </footer>
  );
};
