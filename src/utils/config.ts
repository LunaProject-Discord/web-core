import { ArrowDownwardOutlined, ArrowRightOutlined, ArrowUpwardOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { createContext } from 'react';

type ConfigIconKeys = 'More' | 'OpenInNew' | 'Increment' | 'Decrement';

type ConfigIcons = { [key in ConfigIconKeys]: typeof SvgIcon };

interface Config {
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
