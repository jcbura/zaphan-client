'use client';

import { Button, TestScore } from '@/components';

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
    <footer className="mt-6 flex flex-col items-start gap-6 border-t pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <TestScore />
      <div className="grid w-full grid-cols-2 gap-4 sm:ml-auto sm:flex sm:w-auto">
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="col-span-2"
        >
          submit
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={!canReset}
          className="col-span-1"
        >
          reset
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onRevealAll}
          disabled={!canRevealAll}
          className="col-span-1"
        >
          reveal all
        </Button>
      </div>
    </footer>
  );
};
