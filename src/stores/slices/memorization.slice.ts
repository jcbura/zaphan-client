import {
  checkBlanks,
  compare,
  isLocked,
  scoreResults,
  type BlankedSegment,
  type TestState,
} from '@/memorization';
import { type RootState } from '@/stores';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MemorizationState {
  segments: BlankedSegment[];
  testState: TestState;
  difficulty: number | null;
}

const initialState: MemorizationState = {
  segments: [],
  testState: {},
  difficulty: null,
};

const buildInitialTestState = (segments: BlankedSegment[]): TestState =>
  Object.fromEntries(
    segments
      .map((seg, index) => ({ seg, index }))
      .filter(({ seg }) => seg.blanked)
      .map(({ index }) => [
        index,
        { status: 'unanswered' as const, input: '' },
      ]),
  );

const memorizationSlice = createSlice({
  name: 'memorization',
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<number | null>) {
      if (action.payload === null) {
        state.difficulty = null;
        return;
      }
      state.difficulty = Math.min(100, Math.max(0, action.payload));
    },
    startTest(state, action: PayloadAction<BlankedSegment[]>) {
      state.segments = action.payload;
      state.testState = buildInitialTestState(action.payload);
    },
    retryTest(state, action: PayloadAction<BlankedSegment[] | undefined>) {
      if (action.payload) state.segments = action.payload;
      state.testState = buildInitialTestState(state.segments);
    },
    setInput(state, action: PayloadAction<{ index: number; value: string }>) {
      const { index, value } = action.payload;
      if (isLocked(state.testState[index]?.status)) return;
      state.testState[index] = { ...state.testState[index], input: value };
    },
    submitAnswers(state) {
      for (const [key, blank] of Object.entries(state.testState)) {
        const index = Number(key);
        if (isLocked(blank.status)) continue;
        const expected = state.segments[index].text;
        state.testState[index] = {
          ...blank,
          status: compare(blank.input, expected),
        };
      }
    },
    revealBlank(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.testState[index] = {
        status: 'revealed',
        input: state.segments[index].text,
      };
    },
    clearTest(state) {
      state.segments = [];
      state.testState = {};
    },
    revealAllBlanks(state) {
      for (const [key, blank] of Object.entries(state.testState)) {
        const index = Number(key);
        if (isLocked(blank.status)) continue;
        state.testState[index] = {
          status: 'revealed',
          input: state.segments[index].text,
        };
      }
    },
    resetTest() {
      return initialState;
    },
  },
});

const selectSegments = (state: RootState) => state.memorization.segments;
const selectTestState = (state: RootState) => state.memorization.testState;

export const memorizationSelectors = {
  segments: selectSegments,
  testState: selectTestState,
  difficulty: (state: RootState) => state.memorization.difficulty,
  isTestActive: (state: RootState) =>
    state.memorization.segments.some((segment) => segment.blanked),
  isSubmitted: (state: RootState) =>
    Object.values(state.memorization.testState).some(
      (blank) =>
        blank.status === 'correct' ||
        blank.status === 'incorrect' ||
        blank.status === 'revealed',
    ),
  canSubmit: (state: RootState) => {
    if (!state.memorization.segments.some((segment) => segment.blanked)) {
      return false;
    }
    return Object.values(state.memorization.testState).some(
      (blank) => !isLocked(blank.status),
    );
  },
  canReset: (state: RootState) =>
    state.memorization.segments.some((segment) => segment.blanked),
  canRevealAll: (state: RootState) => {
    if (!state.memorization.segments.some((segment) => segment.blanked)) {
      return false;
    }
    return Object.values(state.memorization.testState).some(
      (blank) => !isLocked(blank.status),
    );
  },
  isComplete: (state: RootState) =>
    Object.values(state.memorization.testState).every((b) =>
      isLocked(b.status),
    ),
  results: createSelector(
    [selectSegments, selectTestState],
    (segments, testState) => checkBlanks(segments, testState),
  ),
  score: createSelector(
    [selectSegments, selectTestState],
    (segments, testState) => scoreResults(checkBlanks(segments, testState)),
  ),
};

export const {
  setDifficulty,
  startTest,
  retryTest,
  setInput,
  submitAnswers,
  revealBlank,
  clearTest,
  revealAllBlanks,
  resetTest,
} = memorizationSlice.actions;
export { memorizationSlice };
