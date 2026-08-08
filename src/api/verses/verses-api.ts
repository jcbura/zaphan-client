import {
  ApiResponse,
  GetVerseArguments,
  GetVersesArguments,
  rootApi,
  Verse,
} from '@/api';

export const versesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerses: builder.query<ApiResponse<Verse[]>, GetVersesArguments>({
      query: ({ bookId, chapterNumber, translation, start, end }) => ({
        url: `books/${bookId}/chapters/${chapterNumber}/verses`,
        params: { translation, start, end },
      }),
    }),
    getVerse: builder.query<ApiResponse<Verse>, GetVerseArguments>({
      query: ({ bookId, chapterNumber, verseNumber, translation }) => ({
        url: `books/${bookId}/chapters/${chapterNumber}/verses/${verseNumber}`,
        params: { translation },
      }),
    }),
  }),
});

export const {
  useGetVersesQuery,
  useGetVerseQuery,
  useLazyGetVersesQuery,
  useLazyGetVerseQuery,
} = versesApi;
