import {
  ApiResponse,
  Book,
  GetBookArguments,
  GetBooksArguments,
  rootApi,
} from '@/api';

export const booksApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<Book[]>, GetBooksArguments>({
      query: ({ testament }) => ({ url: 'books', params: { testament } }),
    }),
    getBook: builder.query<ApiResponse<Book>, GetBookArguments>({
      query: ({ bookId }) => ({ url: `books/${bookId}` }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useLazyGetBooksQuery,
  useLazyGetBookQuery,
} = booksApi;
