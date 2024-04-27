'use client';

import { ButtonBase, ButtonBaseProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { buttonActionStyled } from '../../ButtonBase';
import { SectionCardDisplay } from '../display';
import { sectionCardClasses, SectionCardProps, sectionCardRootStyled } from '../index';

export const sectionButtonCardClasses = {
    root: 'SectionButtonCard-root'
};

export const SectionButtonCardRoot = styled(
    ({ disabled, className, ...props }: ButtonBaseProps) => (
        <ButtonBase
            className={clsx(sectionButtonCardClasses.root, disabled && sectionCardClasses.disabled, className)}
            {...props}
        />
    )
)<ButtonBaseProps>(({ theme }) => ({
    ...sectionCardRootStyled(theme),
    ...buttonActionStyled(theme)
})) as typeof ButtonBase;

export type SectionButtonCardProps<C extends React.ElementType> = SectionCardProps & ButtonBaseProps<C, {
    components?: C
}>;

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
