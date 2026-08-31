import type {
  BlankedSegment,
  BlankResult,
  BlankStatus,
  TestState,
} from '@/memorization';

const normalize = (s: string): string =>
  s.normalize('NFKC').trim().toLowerCase().replace(/[’‘]/g, "'"); // curly apostrophes -> straight

export const isLocked = (status: BlankStatus): boolean =>
  status === 'correct' || status === 'revealed';

export const compare = (input: string, expected: string): BlankStatus => {
  if (input.trim() === '') return 'unanswered';
  return normalize(input) === normalize(expected) ? 'correct' : 'incorrect';
};

export const checkBlanks = (
  segments: BlankedSegment[],
  state: TestState,
): BlankResult[] =>
  segments
    .map((seg, index) => ({ seg, index }))
    .filter(({ seg }) => seg.blanked)
    .map(({ seg, index }) => ({
      index,
      expected: seg.text,
      input: state[index]?.input ?? '',
      status: state[index]?.status ?? 'unanswered',
    }));

export const scoreResults = (results: BlankResult[]) => {
  const total = results.length;
  const correct = results.filter((r) => r.status === 'correct').length;
  return { correct, total, percent: total === 0 ? 1 : correct / total };
};
