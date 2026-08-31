export type BlankedSegment = Segment & { blanked: boolean };

export type BlankResult = {
  index: number;
  expected: string;
  input: string;
  status: BlankStatus;
};

export type BlankState = { status: BlankStatus; input: string };

export type BlankStatus = 'unanswered' | 'correct' | 'incorrect' | 'revealed';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Segment = { text: string; blankable: boolean };

export type TestState = Record<number, BlankState>;
