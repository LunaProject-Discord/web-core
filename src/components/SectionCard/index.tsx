'use client';

import { Box, BoxProps, CSSObject, styled, Theme } from '@mui/material';
import { CreateSlotsAndSlotProps, SlotProps } from '@mui/material/utils/types';
import { BoxTypeMap } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import clsx from 'clsx';
import React, { ElementType, useContext } from 'react';
import { ConfigContext } from '../../utils';
import {
    SectionCardDisplay,
    sectionCardDisplayClasses,
    SectionCardDisplayRootProps,
    SectionCardDisplaySlotsAndSlotProps
} from './display';

export const sectionCardClasses = {
    root: 'SectionCard-root',
    content: 'SectionCard-content',

    disabled: 'SectionCard-disabled',
    variantDefault: 'SectionCard-variantDefault',
    variantOutlined: 'SectionCard-variantOutlined'
};

export const sectionCardRootStyled = (theme: Theme): CSSObject => ({
    minHeight: theme.spacing(8),
    padding: theme.spacing(1, 1.5),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.shortest
    }),
    [`&.${sectionCardClasses.variantOutlined}`]: {
        padding: theme.spacing(.875, 1.375),
        border: `solid 1px ${theme.palette.divider}`
    },
    [`
        &:disabled .${sectionCardDisplayClasses.root} *, &:disabled .${sectionCardDisplayClasses.icon} *, &:disabled .${sectionCardDisplayClasses.primary} *, &:disabled .${sectionCardDisplayClasses.secondary} *, &:disabled .${sectionCardClasses.content} *,
        &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.root} *, &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.icon} *, &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.primary} *, &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.secondary} *, &.${sectionCardClasses.disabled} .${sectionCardClasses.content} *
    `]: {
        color: theme.palette.action.disabled
    }
});

export const SectionCardRoot = styled(
    ({ disabled, variant, className, ...props }: BoxProps & SectionCardDisabledProps & SectionCardVariantProps) => (
        <Box
            className={
                clsx(
                    sectionCardClasses.root,
                    disabled && sectionCardClasses.disabled,
                    variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantDefault,
                    className
                )
            }
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' }
)<BoxProps & SectionCardDisabledProps & SectionCardVariantProps>(({ theme }) => sectionCardRootStyled(theme)) as OverridableComponent<BoxTypeMap<SectionCardDisabledProps & SectionCardVariantProps, 'div', Theme>>;

export const SectionCardContent = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionCardClasses.content, className)}
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' }
)<BoxProps>(({ theme }) => ({
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5)
})) as typeof Box;

export interface SectionCardDisabledProps {
    disabled?: boolean;
}

export interface SectionCardVariantProps {
    variant?: 'default' | 'outlined';
}

export type SectionCardSlotsAndSlotProps = CreateSlotsAndSlotProps<{
    display?: SectionCardDisplaySlotsAndSlotProps['slots'];
    content?: ElementType;
}, {
    display: SectionCardDisplaySlotsAndSlotProps['slotProps'];
    content: SlotProps<typeof Box, {}, {}>;
}>;

export type SectionCardRootProps =
    SectionCardDisplayRootProps
    & SectionCardDisabledProps
    & SectionCardVariantProps
    & SectionCardSlotsAndSlotProps;

export type SectionCardProps<C extends ElementType = BoxTypeMap['defaultComponent']> =
    SectionCardRootProps
    & BoxProps<C, { component?: C }>;

export const SectionCard = <C extends ElementType = BoxTypeMap['defaultComponent'], >(
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
    }: SectionCardProps<C>
) => {
    const { components } = useContext(ConfigContext);

    return (
        <SectionCardRoot disabled={disabled} variant={variant ?? components?.SectionCard?.variant} {...props}>
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={slots?.display}
                slotProps={slotProps?.display}
            />
            {children && <SectionCardContent component={slots?.content} {...slotProps?.content}>
                {children}
            </SectionCardContent>}
        </SectionCardRoot>
    );
};

export * from './Accordion';
export * from './Button';
export * from './Checkbox';
export * from './Link';
export * from './RouteLink';
export * from './Switch';
export * from './display';
