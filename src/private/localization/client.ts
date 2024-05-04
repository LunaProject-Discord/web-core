'use client';

import { parseCookies } from 'nookies';
import { COOKIE_NAME_LOCALE, getLocalizationByName, getTranslationByName, Locale } from './index';

export const useLocale = (): Locale => {
    const cookies = parseCookies();
    return cookies[COOKIE_NAME_LOCALE] as Locale | undefined ?? 'ja';
};

export const useLocalization = () => getLocalizationByName(useLocale());

export const useTranslation = () => getTranslationByName(useLocale());
