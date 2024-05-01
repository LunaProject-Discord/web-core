'use client';

import { FilledInput } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionCard, SectionCardProps, SectionControlCardSlotProps } from '../index';
import { getSectionControlCardClasses } from '../utils';
import { SectionTextFieldCardRootProps } from './index';

export const sectionFilledTextFieldCardClasses = getSectionControlCardClasses('FilledTextField');

export type SectionFilledTextFieldCardSlotProps = SectionControlCardSlotProps<typeof FilledInput>;

export type SectionFilledTextFieldCardProps =
    SectionCardProps
    & SectionTextFieldCardRootProps
    & SectionFilledTextFieldCardSlotProps;

export const SectionFilledTextFieldCard = (
    {
        children,
        value,
        setValue,
        disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionFilledTextFieldCardProps
) => {
    const { components } = useContext(ConfigContext);

    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? components?.SectionFilledTextFieldCard?.variant ?? components?.SectionTextFieldCard?.variant}
            className={clsx(sectionFilledTextFieldCardClasses.root, className)}
            slots={slots}
            slotProps={slotProps}
            {...props}
        >
            {children}
            <FilledInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                size="small"
                margin="none"
                className={sectionFilledTextFieldCardClasses.control}
                sx={{ width: { xs: '100%', md: 300 } }}
                {...slotProps?.control}
            />
        </SectionCard>
    );
};
