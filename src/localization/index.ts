import { enUS as muiEnUS, jaJP as muiJaJP } from '@mui/material/locale';
import { enUS as muiDateEnUS, jaJP as muiDateJaJP } from '@mui/x-date-pickers/locales';
import { enUS as dateFnsEnUS, ja as dateFnsJa } from 'date-fns/locale';
import { localizationEn, localizationJa, translationsEn, translationsJa } from './locales';
import { TranslationMap } from './translation';

export const COOKIE_NAME_LOCALE = 'locale';

export type Locale = 'ja' | 'en';

export interface Localization {
    locale: Locale;
    translations: TranslationMap;
}

export const getLocalizationByName = (language: string | undefined): Localization => {
    switch (language) {
        case 'en':
            return localizationEn;
        default:
            return localizationJa;
    }
};

export const getTranslationByName = (language: string | undefined): TranslationMap => {
    switch (language) {
        case 'en':
            return translationsEn;
        default:
            return translationsJa;
    }
};

export const getDateFnsLocaleByName = (language: string | undefined) => {
    switch (language) {
        case 'en':
            return dateFnsEnUS;
        default:
            return dateFnsJa;
    }
};

export const getMuiLocalizationByName = (language: string | undefined) => {
    switch (language) {
        case 'en':
            return muiEnUS;
        default:
            return muiJaJP;
    }
};

export const getMuiDateLocalizationByName = (language: string | undefined) => {
    switch (language) {
        case 'en':
            return muiDateEnUS;
        default:
            return muiDateJaJP;
    }
};


export * from './client';
export * from './locales';
export * from './server';
export * from './translation';
