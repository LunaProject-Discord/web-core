'use client';

import { Radio } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionButtonCardProps,
    SectionButtonCardRoot,
    SectionCardContent,
    SectionCardDisplay,
    SectionCardDisplayRootProps,
    SectionCardRootProps,
    SectionCardVariableProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';

export const sectionRadioCardClasses = generateSectionControlCardClasses('Radio');

export interface SectionRadioCardRootProps<T> extends SectionCardVariableProps<{ selected: T; }> {
    name: string;
    value: T;
}

export type SectionRadioCardSlotProps = SectionControlCardSlotProps<typeof Radio>;

export type SectionRadioCardProps<T> = Omit<Omit<SectionButtonCardProps, 'value'> & SectionRadioCardRootProps<T> & SectionRadioCardSlotProps, 'component'>;

export const SectionRadioCard = <T, >(
    {
        icon,
        primary,
        secondary,
        children,
        name,
        value,
        selected,
        setSelected,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots: { display = {}, content } = {},
        slotProps: {
            display: displayProps = {},
            content: contentProps = {},
            control: controlProps = {}
        } = {},
        ...props
    }: SectionRadioCardProps<T>
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: {
            display: configRootDisplay = {},
            content: configRootContent = undefined
        } = {},
        slotProps: {
            display: configRootDisplayProps = {},
            content: configRootContentProps = {}
        } = {}
    } = components?.SectionCard ?? {};
    const {
        disabled: configButtonDisabled,
        variant: configButtonVariant,
        slots: {
            display: configButtonDisplay = {},
            content: configButtonContent = undefined
        } = {},
        slotProps: {
            display: configButtonDisplayProps = {},
            content: configButtonContentProps = {}
        } = {}
    } = components?.SectionButtonCard ?? {};
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: {
            display: configDisplay = {},
            content: configContent = undefined
        } = {},
        slotProps: {
            display: configDisplayProps = {},
            content: configContentProps = {},
            control: configControlProps = {}
        } = {}
    } = components?.SectionRadioCard ?? {};

    const handleChange = useCallback(() => setSelected(value), [setSelected, value]);

    const disabled = _disabled ?? configDisabled ?? configButtonDisabled ?? configRootDisabled;
    return (
        <SectionButtonCardRoot
            onClick={handleChange}
            disabled={disabled}
            variant={variant ?? configVariant ?? configButtonVariant ?? configRootVariant}
            className={clsx(sectionRadioCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <Radio
                name={name}
                value={value}
                checked={value === selected}
                onChange={handleChange}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionRadioCardClasses.control}
                sx={{
                    mx: .5,
                    p: 0,
                    display: 'flex',
                    placeItems: 'center',
                    placeContent: 'center',
                    flexShrink: 0,
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
                {...merges(configControlProps, controlProps)}
            />
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={merges(configRootDisplay, configButtonDisplay, configDisplay, display)}
                slotProps={merges(configRootDisplayProps, configButtonDisplayProps, configDisplayProps, displayProps)}
            />
            {children && <SectionCardContent
                component={content ?? configContent ?? configButtonContent ?? configRootContent}
                {...merges(configRootContentProps, configButtonContentProps, configContentProps, contentProps)}
            >
                {children}
            </SectionCardContent>}
        </SectionButtonCardRoot>
    );
};

export type SectionRadioCardConfigProps = Partial<Omit<SectionCardRootProps & SectionRadioCardSlotProps, keyof SectionCardDisplayRootProps>>;
