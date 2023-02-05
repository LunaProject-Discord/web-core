import { rgb } from 'polished';
import type { Theme } from './index';

export const COMMON_THEME: Pick<Theme, 'discord' | 'font'> = {
    discord: {
        primary: rgb(88, 101, 242),
        success: rgb(67, 181, 129),
        warning: rgb(250, 166, 26),
        danger: rgb(240, 71, 71)
    },
    font: {
        sans: [
            'Whitney',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
        ].join(),
        mono: [
            'HackGen',
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            'Liberation Mono',
            'Courier New',
            'monospace'
        ].join()
    }
};
