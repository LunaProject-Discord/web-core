import { atom } from 'jotai';
import { cookies } from 'next/headers';

export const COOKIE_NAME_APPEARANCE = 'appearance';

export type Appearance = 'system' | 'light' | 'dark';

export const getAppearance = async (): Promise<Appearance> => {
    const nextCookies = await cookies();
    return nextCookies.get(COOKIE_NAME_APPEARANCE)?.value as Appearance | undefined ?? 'system';
};

interface AppearanceState {
    appearance: Appearance;
    isDarkMode: boolean;
}

export const appearanceAtom = atom<AppearanceState>({
    appearance: 'system',
    isDarkMode: false
});
