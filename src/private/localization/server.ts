import { cookies } from 'next/headers';
import { COOKIE_NAME_LOCALE, getLocalizationByName, getTranslationByName, Locale } from './index';

export const getLocale = async (): Promise<Locale> => {
    const nextCookies = await cookies();
    return nextCookies.get(COOKIE_NAME_LOCALE)?.value as Locale | undefined ?? 'ja';
};

export const getLocalization = async () => getLocalizationByName(await getLocale());

export const getTranslation = async () => getTranslationByName(await getLocale());
