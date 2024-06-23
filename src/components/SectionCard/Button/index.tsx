'use client';

import { ButtonBase, ButtonBaseProps, ButtonBaseTypeMap, ExtendButtonBase, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ElementType, useContext } from 'react';
import { ConfigContext, generateComponentClasses } from '../../../utils';
import { buttonActionStyled } from '../../ButtonBase';
import {
    sectionCardClasses,
    SectionCardContent,
    SectionCardDisplay,
    SectionCardDisplayIcon,
    SectionCardRootProps,
    sectionCardRootStyled,
    SectionCardVariantProps
} from '../index';
import { merges } from '../utils';

export const sectionButtonCardClasses = generateComponentClasses('SectionButtonCard', ['root']);

export const SectionButtonCardRoot = styled(
    ({ disabled, variant, className, ...props }: ButtonBaseProps & SectionCardVariantProps) => (
        <ButtonBase
            disabled={disabled}
            className={
                clsx(
                    sectionCardClasses.root,
                    disabled && sectionCardClasses.disabled,
                    variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantStandard,
                    sectionButtonCardClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)<ButtonBaseProps & SectionCardVariantProps>(({ theme }) => ({
    ...sectionCardRootStyled(theme),
    ...buttonActionStyled(theme)
})) as ExtendButtonBase<ButtonBaseTypeMap<SectionCardVariantProps>>;

export type SectionButtonCardProps<C extends ElementType = ButtonBaseTypeMap['defaultComponent']> =
    SectionCardRootProps
    & ButtonBaseProps<C, { component?: C }>;

export const SectionButtonCard = <C extends ElementType = ButtonBaseTypeMap['defaultComponent'], >(
    {
        icon,
        primary,
        secondary,
        children,
        disabled,
        variant,
        slots: { display = {}, content } = {},
        slotProps: {
            display: displayProps = {},
            content: contentProps = {}
        } = {},
        ...props
    }: SectionButtonCardProps<C>
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
        disabled: configDisabled,
        variant: configVariant,
        slots: {
            display: configDisplay = {},
            content: configContent = undefined
        } = {},
        slotProps: {
            display: configDisplayProps = {},
            content: configContentProps = {}
        } = {}
    } = components?.SectionButtonCard ?? {};

    return (
        <SectionButtonCardRoot
            disabled={disabled ?? configDisabled ?? configRootDisabled}
            variant={variant ?? configVariant ?? configRootVariant}
            {...props}
        >
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={merges(configRootDisplay, configDisplay, display)}
                slotProps={merges(configRootDisplayProps, configDisplayProps, displayProps)}
            />
            {children && <SectionCardContent
                component={content ?? configContent ?? configRootContent}
                {...merges(configRootContentProps, configContentProps, contentProps)}
            >
                {children}
            </SectionCardContent>}
        </SectionButtonCardRoot>
    );
};

export const SectionButtonActionCard = <C extends ElementType = ButtonBaseTypeMap['defaultComponent'], >(
    {
        icon,
        primary,
        secondary,
        children,
        disabled: _disabled,
        variant,
        sx,
        slots: { display = {}, content } = {},
        slotProps: {
            display: displayProps = {},
            content: contentProps = {}
        } = {},
        ...props
    }: SectionButtonCardProps<C>
) => {
    const { components, icons: { More } } = useContext(ConfigContext);
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
        disabled: configDisabled,
        variant: configVariant,
        slots: {
            display: configDisplay = {},
            content: configContent = undefined
        } = {},
        slotProps: {
            display: configDisplayProps = {},
            content: configContentProps = {}
        } = {}
    } = components?.SectionButtonCard ?? {};

    const disabled = _disabled ?? configDisabled ?? configRootDisabled;
    return (
        <SectionButtonCardRoot
            disabled={disabled}
            variant={variant ?? configVariant ?? configRootVariant}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={merges(configRootDisplay, configDisplay, display)}
                slotProps={merges(configRootDisplayProps, configDisplayProps, displayProps)}
            />
            <SectionCardContent
                component={content ?? configContent ?? configRootContent}
                {...merges(configRootContentProps, configContentProps, contentProps)}
            >
                {children}
                <SectionCardDisplayIcon>
                    <More color={!disabled ? 'action' : 'disabled'} />
                </SectionCardDisplayIcon>
            </SectionCardContent>
        </SectionButtonCardRoot>
    );
};
