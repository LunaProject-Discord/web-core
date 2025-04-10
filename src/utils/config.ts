'use client';

import {
    ArrowBackOutlined,
    ArrowDownwardOutlined, ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    ArrowRightOutlined,
    ArrowUpwardOutlined, CloudOffOutlined, CloudOutlined,
    ExpandLessOutlined,
    ExpandMoreOutlined,
    KeyboardArrowDownOutlined,
    KeyboardArrowLeftOutlined,
    KeyboardArrowRightOutlined,
    KeyboardArrowUpOutlined,
    OpenInNewOutlined, SearchOutlined,
    ToggleOffOutlined,
    ToggleOnOutlined
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import deepmerge from 'deepmerge';
import { createContext, createElement, Fragment, ProviderProps, ReactNode } from 'react';
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
    | 'ArrowDropDown'
    | 'ArrowDropUp'
    | 'ArrowForward'
    | 'ArrowUpward'
    | 'Cloud'
    | 'CloudOff'
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
    | 'Search'
    | 'ToggleOff'
    | 'ToggleOn';

export type ConfigIcons = { [key in ConfigIconKeys]: typeof SvgIcon };

export type ConfigTranslateKeys =
    'close'
    | 'error_data_not_found_title'
    | 'error_data_not_found_description'
    | 'open';

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
        ArrowDropDown: ArrowDropDownOutlined,
        ArrowDropUp: ArrowDropUpOutlined,
        ArrowForward: ArrowRightOutlined,
        ArrowUpward: ArrowUpwardOutlined,
        Cloud: CloudOutlined,
        CloudOff: CloudOffOutlined,
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
        Search: SearchOutlined,
        ToggleOff: ToggleOffOutlined,
        ToggleOn: ToggleOnOutlined
    },
    translations: {
        close: 'Close',
        error_data_not_found_title: 'Data not found!',
        error_data_not_found_description: createElement(
            Fragment,
            {},
            'There is no data available for display at this time.',
            createElement('br'),
            'Please wait a while and try again.'
        ),
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

