'use client';

import { ButtonBase, ButtonBaseProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { buttonActionStyled } from '../../ButtonBase';
import { SectionCardDisplay, SectionCardDisplayProps } from '../display';
import { sectionCardClasses, SectionCardDisabledProps, sectionCardRootStyled } from '../index';

export const sectionButtonCardClasses = {
    root: 'SectionButtonCard-root'
};

export const SectionButtonCardRoot = styled(
    ({ disabled, className, ...props }: ButtonBaseProps) => (
        <ButtonBase
            disabled={disabled}
            className={clsx(sectionCardClasses.root, sectionButtonCardClasses.root, disabled && sectionCardClasses.disabled, className)}
            {...props}
        />
    )
)<ButtonBaseProps>(({ theme }) => ({
    ...sectionCardRootStyled(theme),
    ...buttonActionStyled(theme)
})) as typeof ButtonBase;

export type SectionButtonCardProps<C extends React.ElementType> =
    SectionCardDisplayProps
    & SectionCardDisabledProps
    & Omit<ButtonBaseProps<C, { components?: C }>, 'children'>;

export const SectionButtonCard = <C extends React.ElementType, >(
    {
        icon,
        primary,
        secondary,
        disabled,
        slots,
        slotProps,
        ...props
    }: SectionButtonCardProps<C>
) => (
    <SectionButtonCardRoot disabled={disabled} {...props}>
        <SectionCardDisplay
            icon={icon}
            primary={primary}
            secondary={secondary}
            slots={slots}
            slotProps={slotProps}
        />
    </SectionButtonCardRoot>
);
