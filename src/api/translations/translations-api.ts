import {
  ApiResponse,
  GetTranslationArguments,
  rootApi,
  Translation,
} from '@/api';

export const translationsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTranslations: builder.query<ApiResponse<Translation[]>, void>({
      query: () => ({ url: 'translations' }),
    }),
    getTranslation: builder.query<
      ApiResponse<Translation>,
      GetTranslationArguments
    >({
      query: ({ translationId }) => ({ url: `translations/${translationId}` }),
    }),
  }),
});

export const {
  useGetTranslationsQuery,
  useGetTranslationQuery,
  useLazyGetTranslationsQuery,
  useLazyGetTranslationQuery,
} = translationsApi;
