'use client';

import { ButtonBase, ButtonBaseProps, styled } from '@mui/material';
import { ButtonBaseTypeMap, ExtendButtonBase } from '@mui/material/ButtonBase/ButtonBase';
import clsx from 'clsx';
import React, { ElementType, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { buttonActionStyled } from '../../ButtonBase';
import { SectionCardDisplay } from '../display';
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
    & ButtonBaseProps<C, { components?: C }>;

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
