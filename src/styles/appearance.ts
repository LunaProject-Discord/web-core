import type { FONT_SIZES } from './constants';

export interface Appearance {
    color: 'dark' | 'light';
    display: 'cozy' | 'compact';
    fontSize: typeof FONT_SIZES[number];
}
