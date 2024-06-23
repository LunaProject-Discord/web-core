'use client';

import { Checkbox } from '@mui/material';
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
    SectionSwitchCardRootProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';

export const sectionCheckboxCardClasses = generateSectionControlCardClasses('Checkbox');

export type SectionCheckboxCardSlotProps = SectionControlCardSlotProps<typeof Checkbox>;

export type SectionCheckboxCardProps = Omit<SectionButtonCardProps & SectionSwitchCardRootProps & SectionCheckboxCardSlotProps, 'component'>;

export const SectionCheckboxCard = (
    {
        icon,
        primary,
        secondary,
        children,
        checked,
        setChecked,
        defaultChecked,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots: { display, content } = {},
        slotProps: { display: displayProps, content: contentProps, control: controlProps } = {},
        ...props
    }: SectionCheckboxCardProps
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
        defaultChecked: configDefaultChecked,
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
    } = components?.SectionCheckboxCard ?? {};

    const handleChange = useCallback(() => setChecked(!checked), [setChecked, checked]);

    const disabled = _disabled ?? configDisabled ?? configButtonDisabled ?? configRootDisabled;
    return (
        <SectionButtonCardRoot
            onClick={handleChange}
            disabled={disabled}
            variant={variant ?? configVariant ?? configButtonVariant ?? configRootVariant}
            className={clsx(sectionCheckboxCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <Checkbox
                checked={checked}
                onChange={handleChange}
                defaultChecked={defaultChecked ?? configDefaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionCheckboxCardClasses.control}
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

export type SectionCheckboxCardConfigProps = Partial<Omit<SectionCardRootProps & Pick<SectionSwitchCardRootProps, 'defaultChecked'> & SectionCheckboxCardSlotProps, keyof SectionCardDisplayRootProps>>;
