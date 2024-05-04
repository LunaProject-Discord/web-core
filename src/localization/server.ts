import { cookies } from 'next/headers';
import { COOKIE_NAME_LOCALE, getLocalizationByName, getTranslationByName, Locale } from './index';

export const getLocale = (): Locale => {
    const nextCookies = cookies();
    return nextCookies.get(COOKIE_NAME_LOCALE)?.value as Locale | undefined ?? 'ja';
};

export const getLocalization = () => getLocalizationByName(getLocale());

export const getTranslation = () => getTranslationByName(getLocale());
