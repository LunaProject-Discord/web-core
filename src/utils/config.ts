'use client';

import {
    ArrowBackOutlined,
    ArrowDownwardOutlined,
    ArrowRightOutlined,
    ArrowUpwardOutlined,
    ExpandLessOutlined,
    ExpandMoreOutlined,
    KeyboardArrowDownOutlined,
    KeyboardArrowLeftOutlined,
    KeyboardArrowRightOutlined,
    KeyboardArrowUpOutlined,
    OpenInNewOutlined,
    ToggleOffOutlined,
    ToggleOnOutlined
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { createContext, Provider, ReactNode } from 'react';
import {
    SectionAccordionCardConfigProps,
    SectionCardConfigProps,
    SectionCheckboxCardConfigProps,
    SectionFilledNumberFieldCardConfigProps,
    SectionFilledTextFieldCardConfigProps,
    SectionOutlinedNumberFieldCardConfigProps,
    SectionOutlinedTextFieldCardConfigProps,
    SectionRadioCardConfigProps,
    SectionSelectCardConfigProps,
    SectionSliderCardConfigProps,
    SectionSwitchCardConfigProps
} from '../components';
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
    SectionSliderCard?: SectionSliderCardConfigProps;
    SectionSwitchCard?: SectionSwitchCardConfigProps;
    SectionTextFieldCard?: SectionCardConfigProps;
}

export type ConfigIconKeys =
    'ArrowBack'
    | 'ArrowDownward'
    | 'ArrowForward'
    | 'ArrowUpward'
    | 'Decrement'
    | 'ExpandLess'
    | 'ExpandMore'
    | 'Increment'
    | 'KeyboardArrowDown'
    | 'KeyboardArrowLeft'
    | 'KeyboardArrowRight'
    | 'KeyboardArrowUp'
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
        ArrowBack: ArrowBackOutlined,
        ArrowDownward: ArrowDownwardOutlined,
        ArrowForward: ArrowRightOutlined,
        ArrowUpward: ArrowUpwardOutlined,
        Decrement: ArrowDownwardOutlined,
        ExpandLess: ExpandLessOutlined,
        ExpandMore: ExpandMoreOutlined,
        Increment: ArrowUpwardOutlined,
        KeyboardArrowDown: KeyboardArrowDownOutlined,
        KeyboardArrowLeft: KeyboardArrowLeftOutlined,
        KeyboardArrowRight: KeyboardArrowRightOutlined,
        KeyboardArrowUp: KeyboardArrowUpOutlined,
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
