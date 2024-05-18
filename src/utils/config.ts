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
import { createContext, Provider, ReactNode } from 'react';
import {
    SectionAccordionCardConfigProps,
    SectionCardConfigProps,
    SectionCardVariantProps,
    SectionCheckboxCardConfigProps,
    SectionFilledTextFieldCardConfigProps,
    SectionOutlinedTextFieldCardConfigProps,
    SectionRadioCardConfigProps,
    SectionSelectCardConfigProps,
    SectionSwitchCardConfigProps
} from '../components';
import {
    SectionFilledNumberFieldCardConfigProps,
    SectionOutlinedNumberFieldCardConfigProps
} from '../components/SectionCard/NumberField';
import { DeepPartial } from './types';

export interface ConfigComponents {
    SectionCard?: SectionCardConfigProps;
    SectionAccordionCard?: SectionAccordionCardConfigProps;
    SectionButtonActionCard?: SectionCardConfigProps;
    SectionButtonCard?: SectionCardConfigProps;
    SectionCheckboxCard?: SectionCheckboxCardConfigProps;
    SectionFilledNumberFieldCard?: SectionFilledNumberFieldCardConfigProps;
    SectionFilledTextFieldCard?: SectionFilledTextFieldCardConfigProps;
    SectionLinkCard?: SectionCardConfigProps;
    SectionNumberFieldCard?: SectionCardConfigProps;
    SectionOutlinedNumberFieldCard?: SectionOutlinedNumberFieldCardConfigProps;
    SectionOutlinedTextFieldCard?: SectionOutlinedTextFieldCardConfigProps;
    SectionRadioCard?: SectionRadioCardConfigProps;
    SectionRouteLinkCard?: SectionCardConfigProps;
    SectionSelectCard?: SectionSelectCardConfigProps;
    SectionSliderCard?: {
        variant?: SectionCardVariantProps['variant'];
    };
    SectionSwitchCard?: SectionSwitchCardConfigProps;
    SectionTextFieldCard?: SectionCardConfigProps;
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

export type ConfigTranslateKeys = 'close' | 'open';

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

export const ConfigProvider = ConfigContext.Provider as Provider<DeepPartial<Config>>;
