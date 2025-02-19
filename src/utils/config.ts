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
import deepmerge from 'deepmerge';
import { createContext, createElement, ProviderProps, ReactNode } from 'react';
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

const DefaultConfig: Config = {
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
};

export const ConfigContext = createContext<Config>(DefaultConfig);

export const ConfigProvider = ({ value, children }: ProviderProps<{
    components?: ConfigComponents;
    icons?: Partial<ConfigIcons>;
    translations?: Partial<ConfigTranslations>;
}>) => createElement(
    ConfigContext,
    { value: deepmerge(DefaultConfig, value) as Config },
    children
);

