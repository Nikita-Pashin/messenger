import { cookies } from 'next/headers';
import { RU } from '../locales/ru';
import { EN } from '../locales/en';

type Lang = 'en' | 'ru';

export const getDictionary = () => {
  const lang = cookies().get('lang')?.value as Lang || 'en';

  const keyset = {
    ru: RU,
    en: EN,
  }

  const dictionary: typeof EN = keyset[lang]

  return dictionary;
}