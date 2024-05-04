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

export type TranslationValue = string | (string | [string, Breakpoint[] | undefined])[];

export type TranslationMap = Record<TranslationKey, TranslationValue>;

export const translate = (translation: TranslationValue, ...placeholders: [string, string | number | boolean][]): ReactNode => {
    if (typeof translation === 'string') {
        let translated = translation;
        placeholders.forEach(([key, value]) => {
            translated = translated.replaceAll(key, value.toString());
        });

        return translated;
    }

    return (
        <Fragment>
            {translation.map((value, index) => {
                let translated = typeof value === 'string' ? value : value[0];
                const breakpoints = typeof value === 'string' ? undefined : value[1];

                placeholders.forEach(([key, value]) => {
                    translated = translated.replaceAll(key, value.toString());
                });

                return (
                    <Fragment key={index}>
                        {translated}
                        {translation.length - 1 > index && <Box
                            component="br"
                            sx={(theme) => {
                                if (!breakpoints) {
                                    return {
                                        display: 'block'
                                    };
                                }

                                const styles: Record<string, string | Record<string, string>> = {
                                    display: 'none'
                                };

                                breakpoints.forEach((breakpoint) => {
                                    styles[theme.breakpoints.only(breakpoint)] = {
                                        display: 'block'
                                    };
                                });

                                return styles;
                            }}
                        />}
                    </Fragment>
                );
            })}
        </Fragment>
    );
};
