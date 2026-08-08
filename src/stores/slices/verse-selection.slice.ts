import { type RootState } from '@/stores';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VerseSelectionState {
  translation: string | null;
  bookId: number | null;
  chapterNumber: number | null;
  verseStart: number | null;
  verseEnd: number | null;
}

const initialState: VerseSelectionState = {
  translation: null,
  bookId: null,
  chapterNumber: null,
  verseStart: null,
  verseEnd: null,
};

const verseSelectionSlice = createSlice({
  name: 'verseSelection',
  initialState,
  reducers: {
    setTranslation(state, action: PayloadAction<string>) {
      state.translation = action.payload;
    },
    setBook(state, action: PayloadAction<number>) {
      state.bookId = action.payload;
      state.chapterNumber = null;
      state.verseStart = null;
      state.verseEnd = null;
    },
    setChapter(state, action: PayloadAction<number>) {
      state.chapterNumber = action.payload;
      state.verseStart = null;
      state.verseEnd = null;
    },
    setVerseStart(state, action: PayloadAction<number>) {
      state.verseStart = action.payload;
      if (state.verseEnd !== null && state.verseEnd < action.payload) {
        state.verseEnd = null;
      }
    },
    setVerseEnd(state, action: PayloadAction<number | null>) {
      const { verseStart } = state;
      if (
        action.payload !== null &&
        verseStart !== null &&
        action.payload < verseStart
      ) {
        return;
      }
      state.verseEnd = action.payload;
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
  verseStart: (state: RootState) => state.verseSelection.verseStart,
  verseEnd: (state: RootState) => state.verseSelection.verseEnd,
};

export const {
  setTranslation,
  setBook,
  setChapter,
  setVerseStart,
  setVerseEnd,
} = verseSelectionSlice.actions;
export { verseSelectionSlice };
