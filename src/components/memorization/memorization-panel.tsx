'use client';

import { TestActionBar, TestArea, VerseDisplay } from '@/components';
import { useMemorizationSession } from '@/hooks';

export const MemorizationPanel = () => {
  const {
    displayText,
    isTestActive,
    canSubmit,
    canReset,
    canRevealAll,
    resetTest,
    submitTest,
    revealAll,
  } = useMemorizationSession();

  return (
    <>
      {isTestActive ? (
        <TestArea />
      ) : (
        displayText && <VerseDisplay text={displayText} />
      )}

      {isTestActive && (
        <TestActionBar
          canSubmit={canSubmit}
          canReset={canReset}
          canRevealAll={canRevealAll}
          onSubmit={submitTest}
          onReset={resetTest}
          onRevealAll={revealAll}
        />
      )}
    </>
  );
};
