'use client';

import { ButtonBase, ButtonBaseProps, ButtonBaseTypeMap, ExtendButtonBase, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ElementType, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { buttonActionStyled } from '../../ButtonBase';
import { SectionCardDisplay, SectionCardDisplayIcon } from '../display';
import {
    sectionCardClasses,
    SectionCardContent,
    SectionCardRootProps,
    sectionCardRootStyled,
    SectionCardVariantProps
} from '../index';

export const sectionButtonCardClasses = {
    root: 'SectionButtonCard-root'
};

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
        slots,
        slotProps,
        ...props
    }: SectionButtonCardProps<C>
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: configRootSlots,
        slotProps: configRootSlotProps
    } = components?.SectionCard ?? {};
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
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
                slots={slots?.display ?? configSlots?.display ?? configRootSlots?.display}
                slotProps={slotProps?.display ?? configSlotProps?.display ?? configRootSlotProps?.display}
            />
            {children && <SectionCardContent
                component={slots?.content ?? configSlots?.content ?? configRootSlots?.content}
                {...(slotProps?.content ?? configSlotProps?.content ?? configRootSlotProps?.content)}
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
        slots,
        slotProps,
        ...props
    }: SectionButtonCardProps<C>
) => {
    const { components, icons: { More } } = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: configRootSlots,
        slotProps: configRootSlotProps
    } = components?.SectionCard ?? {};
    const {
        disabled: configButtonDisabled,
        variant: configButtonVariant,
        slots: configButtonSlots,
        slotProps: configButtonSlotProps
    } = components?.SectionButtonCard ?? {};
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionButtonCard ?? {};

    const disabled = _disabled ?? configDisabled ?? configButtonDisabled ?? configRootDisabled;
    return (
        <SectionButtonCardRoot
            disabled={disabled}
            variant={variant ?? configVariant ?? configButtonVariant ?? configRootVariant}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={slots?.display ?? configSlots?.display ?? configButtonSlots?.display ?? configRootSlots?.display}
                slotProps={slotProps?.display ?? configSlotProps?.display ?? configButtonSlotProps?.display ?? configRootSlotProps?.display}
            />
            <SectionCardContent
                component={slots?.content ?? configSlots?.content ?? configButtonSlots?.content ?? configRootSlots?.content}
                {...(slotProps?.content ?? configSlotProps?.content ?? configButtonSlotProps?.content ?? configRootSlotProps?.content)}
            >
                {children}
                <SectionCardDisplayIcon>
                    <More color={!disabled ? 'action' : 'disabled'} />
                </SectionCardDisplayIcon>
            </SectionCardContent>
        </SectionButtonCardRoot>
    );
};
