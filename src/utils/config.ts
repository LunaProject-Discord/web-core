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
import { SectionCardVariantProps } from '../components';

export interface ConfigComponents {
    SectionCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionAccordionCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionButtonCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionCheckboxCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionFilledTextFieldCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionLinkCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionNumberFieldCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionOutlinedTextFieldCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionRadioCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionRouteLinkCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionSelectCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionSliderCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionSwitchCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionTextFieldCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
}

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
    components?: ConfigComponents;
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
