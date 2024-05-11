import { Box, Breakpoint } from '@mui/material';
import React, { Fragment, ReactNode } from 'react';

export type TranslationKey =
    'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'loading'
    | 'login'
    | 'logout'
    | 'yes'
    | 'no'
    | 'enabled'
    | 'disabled'
    | 'default'
    | 'add'
    | 'remove'
    | 'create'
    | 'delete'
    | 'edit'
    | 'confirm'
    | 'cancel'
    | 'save'
    | 'reset'
    | 'discard_changes'
    | 'open'
    | 'close'
    | 'back'
    | 'forward'
    | 'move_up'
    | 'move_down'
    | 'duplicate'
    | 'more_details'


    | 'error_unauthorized_title'
    | 'error_unauthorized_description'
    | 'error_forbidden_title'
    | 'error_forbidden_description'
    | 'error_not_found_title'
    | 'error_not_found_description'


    | 'home'
    | 'back_to_home'


    | 'lunaproject'
    | 'yudzuki'
    | 'satsuki'
    | 'natsuki'

    | 'lunaproject_services'
    | 'lunaproject_document'
    | 'lunaproject_account'


    | 'site_settings'

    | 'design_and_appearance'
    | 'device_theme'
    | 'light_theme'
    | 'dark_theme'

    | 'language'
    | 'japanese'
    | 'english';

export type TranslationValueText = { text: string, br?: Breakpoint[] | false };
export type TranslationValueWords = { words: string[] };

export type TranslationValue = string | TranslationValueText[] | TranslationValueWords[];

export type TranslationPlaceholder = [string, string | number];
export type TranslationPlaceholders = TranslationPlaceholder[];

export type TranslationMap<T extends keyof any = never> = Record<TranslationKey | T, TranslationValue>;

const isTranslationValueWordsArray = (value: TranslationValue): value is TranslationValueWords[] => typeof value !== 'string' && 'words' in value[0];

const replace = (text: string, placeholders: TranslationPlaceholders): string => {
    let translated = text;
    placeholders.forEach(([key, value]) => {
        translated = translated.replaceAll(key, typeof value === 'string' ? value : value.toLocaleString());
    });
    return translated;
};

export const translate = (translation: TranslationValue, ...placeholders: TranslationPlaceholders): ReactNode => {
    if (typeof translation === 'string')
        return replace(translation, placeholders);

    if (translation.length < 1)
        return null;

    if (isTranslationValueWordsArray(translation)) {
        return (
            <Box sx={{ '& span': { display: 'inline-block' } }}>
                {translation.map(({ words }, i) => (
                    <span key={`words_${i}`}>
                        {words.map((word, v) => (
                            <span key={`word_${v}`}>
                                {replace(word, placeholders)}
                            </span>
                        ))}
                    </span>
                ))}
            </Box>
        );
    } else {
        return (
            <Fragment>
                {translation.map(({ text, br }, i) => (
                    <Fragment key={`text_${i}`}>
                        {replace(text, placeholders)}
                        {translation.length - 1 > i && <Box
                            component="br"
                            sx={(theme) => {
                                if (br === undefined)
                                    return {};

                                if (!br)
                                    return { display: 'none' };

                                const styles: Record<string, string | Record<string, string>> = {
                                    display: 'none'
                                };

                                br.forEach((breakpoint) => {
                                    styles[theme.breakpoints.only(breakpoint)] = {
                                        display: 'block'
                                    };
                                });

                                return styles;
                            }}
                        />}
                    </Fragment>
                ))}
            </Fragment>
        );
    }
};
