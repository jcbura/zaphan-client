'use client';

import { Translation, useGetTranslationsQuery } from '@/api';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setTranslation, verseSelectionSelectors } from '@/stores';

export const TranslationCombobox = () => {
  const dispatch = useAppDispatch();
  const translation = useAppSelector(verseSelectionSelectors.translation);

  const { data, isLoading } = useGetTranslationsQuery();

  const translations = data?.result ?? [];
  const selectedTranslation =
    translations.find((t) => t.name === translation) ?? null;

  return (
    <Combobox
      autoHighlight
      items={translations}
      value={selectedTranslation}
      onValueChange={(translation: Translation | null) => {
        dispatch(setTranslation(translation?.name ?? null));
      }}
      itemToStringValue={(translation: Translation) => translation.name}
      itemToStringLabel={(translation: Translation) => translation.name}
    >
      <ComboboxInput
        className="hover:bg-muted dark:hover:bg-muted/50 rounded-none rounded-tl rounded-tr border-t-0 border-r-0 border-b border-l-0 bg-transparent sm:max-w-45 dark:bg-transparent"
        placeholder={isLoading ? 'loading translations…' : 'select translation'}
        disabled={isLoading}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>no translations found</ComboboxEmpty>
        <ComboboxList>
          {(translation: Translation) => (
            <ComboboxItem key={translation.id} value={translation}>
              {translation.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
