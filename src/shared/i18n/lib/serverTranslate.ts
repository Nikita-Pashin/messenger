import { EN } from '../locales/en';
import { RU } from '../locales/ru';

type Lang = 'en' | 'ru';

export const serverTranslate = async (key: keyof typeof EN) => {
  const keyset = {
    ru: RU,
    en: EN,
  }

  const { cookies } = await import('next/headers');
  const currentLang = cookies().get('lang')?.value as Lang || 'en';

  return keyset[currentLang][key];
}
