import { Appearance, DefaultAppearance } from './appearance';
import { ColorPalette, DarkPalette, LightPalette } from './color';
import { CommonTheme, DefaultCommonTheme } from './common';

export interface Theme extends ColorPalette, CommonTheme {
    appearance: Appearance;
}

export const DefaultTheme: Theme = {
    ...DefaultCommonTheme,
    ...DarkPalette,
    appearance: DefaultAppearance
};

export const buildTheme = (appearance: Partial<Appearance>): Theme => ({
    ...DefaultCommonTheme,
    ...(appearance.color === 'dark' ? DarkPalette : LightPalette),
    appearance: {
        ...DefaultAppearance,
        ...appearance
    }
});
