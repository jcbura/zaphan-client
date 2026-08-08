import { TranslationIdParam } from '@/api';

export type GetTranslationArguments = TranslationIdParam;

export type Translation = {
  id: number;
  name: string;
};
