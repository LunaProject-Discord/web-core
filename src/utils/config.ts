import { ArrowDownwardOutlined, ArrowRightOutlined, ArrowUpwardOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { createContext } from 'react';

export type ConfigIconKeys = 'More' | 'OpenInNew' | 'Increment' | 'Decrement';

export type ConfigIcons = { [key in ConfigIconKeys]: typeof SvgIcon };

export interface Config {
    icons: ConfigIcons;
}

export const ConfigContext = createContext<Config>({
    icons: {
        Decrement: ArrowDownwardOutlined,
        Increment: ArrowUpwardOutlined,
        More: ArrowRightOutlined,
        OpenInNew: OpenInNewOutlined
    }
});

export const ConfigProvider = ConfigContext.Provider;
