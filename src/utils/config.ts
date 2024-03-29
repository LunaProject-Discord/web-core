import {
    ArrowDownwardOutlined,
    ArrowRightOutlined,
    ArrowUpwardOutlined,
    ExpandLessOutlined,
    ExpandMoreOutlined,
    OpenInNewOutlined,
    ToggleOffOutlined,
    ToggleOnOutlined
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { createContext, ReactNode } from 'react';

export type ConfigIconKeys =
    'Decrement'
    | 'ExpandLess'
    | 'ExpandMore'
    | 'Increment'
    | 'More'
    | 'OpenInNew'
    | 'ToggleOff'
    | 'ToggleOn';

export type ConfigIcons = { [key in ConfigIconKeys]: typeof SvgIcon };

export type ConfigTranslateKeys = 'open' | 'close';

export type ConfigTranslations = { [key in ConfigTranslateKeys]: ReactNode };

export interface Config {
    icons: ConfigIcons;
    translations: ConfigTranslations;
}

export const ConfigContext = createContext<Config>({
    icons: {
        Decrement: ArrowDownwardOutlined,
        ExpandLess: ExpandLessOutlined,
        ExpandMore: ExpandMoreOutlined,
        Increment: ArrowUpwardOutlined,
        More: ArrowRightOutlined,
        OpenInNew: OpenInNewOutlined,
        ToggleOff: ToggleOffOutlined,
        ToggleOn: ToggleOnOutlined
    },
    translations: {
        close: 'Close',
        open: 'Open'
    }
});

export const ConfigProvider = ConfigContext.Provider;
