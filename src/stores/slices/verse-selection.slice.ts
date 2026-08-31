import { type RootState } from '@/stores';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VerseSelectionState {
  translation: string | null;
  bookId: number | null;
  chapterNumber: number | null;
  startVerse: number | null;
  endVerse: number | null;
}

const initialState: VerseSelectionState = {
  translation: null,
  bookId: null,
  chapterNumber: null,
  startVerse: null,
  endVerse: null,
};

const verseSelectionSlice = createSlice({
  name: 'verseSelection',
  initialState,
  reducers: {
    setTranslation(state, action: PayloadAction<string | null>) {
      state.translation = action.payload;
      if (action.payload === null) {
        state.bookId = null;
        state.chapterNumber = null;
        state.startVerse = null;
        state.endVerse = null;
      }
    },
    setBook(state, action: PayloadAction<number | null>) {
      state.bookId = action.payload;
      state.chapterNumber = null;
      state.startVerse = null;
      state.endVerse = null;
    },
    setChapter(state, action: PayloadAction<number | null>) {
      state.chapterNumber = action.payload;
      state.startVerse = null;
      state.endVerse = null;
    },
    setStartVerse(state, action: PayloadAction<number | null>) {
      state.startVerse = action.payload;
      if (action.payload === null) {
        state.endVerse = null;
      } else if (state.endVerse !== null && state.endVerse < action.payload) {
        state.endVerse = null;
      }
    },
    setEndVerse(state, action: PayloadAction<number | null>) {
      const { startVerse } = state;
      if (
        action.payload !== null &&
        startVerse !== null &&
        action.payload < startVerse
      ) {
        return;
      }
      state.endVerse = action.payload;
    },
    resetSelection() {
      return initialState;
    },
  },
});

export const verseSelectionSelectors = {
  translation: (state: RootState) => state.verseSelection.translation,
  bookId: (state: RootState) => state.verseSelection.bookId,
  chapterNumber: (state: RootState) => state.verseSelection.chapterNumber,
  startVerse: (state: RootState) => state.verseSelection.startVerse,
  endVerse: (state: RootState) => state.verseSelection.endVerse,
};

export const {
  setTranslation,
  setBook,
  setChapter,
  setStartVerse,
  setEndVerse,
} = verseSelectionSlice.actions;
export { verseSelectionSlice };
