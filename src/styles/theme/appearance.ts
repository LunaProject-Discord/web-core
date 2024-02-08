export type AppearanceColor = 'dark' | 'light';

export type AppearanceDisplay = 'cozy' | 'compact';

export type AppearanceFontSize = 12 | 14 | 15 | 16 | 18 | 20 | 24;

export interface Appearance {
    color: AppearanceColor;
    display: AppearanceDisplay;
    fontSize: AppearanceFontSize;
}

export const DefaultAppearance: Appearance = {
    color: 'dark',
    display: 'cozy',
    fontSize: 16
};
