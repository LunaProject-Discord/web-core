import type { Appearance } from '../appearance';
import type { ColorTheme } from './color';

export interface Theme extends ColorTheme {
    appearance: Appearance;
}
