import {
  ApiResponse,
  Chapter,
  GetChapterArguments,
  GetChaptersArguments,
  rootApi,
} from '@/api';

export const chaptersApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query<ApiResponse<Chapter[]>, GetChaptersArguments>({
      query: ({ bookId }) => ({ url: `books/${bookId}/chapters` }),
    }),
    getChapter: builder.query<ApiResponse<Chapter>, GetChapterArguments>({
      query: ({ bookId, chapterNumber }) => ({
        url: `books/${bookId}/chapters/${chapterNumber}`,
      }),
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetChapterQuery,
  useLazyGetChaptersQuery,
  useLazyGetChapterQuery,
} = chaptersApi;
