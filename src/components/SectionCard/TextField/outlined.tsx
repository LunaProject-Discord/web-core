'use client';

import { OutlinedInput } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionCard, SectionCardProps, SectionControlCardSlotProps } from '../index';
import { getSectionControlCardClasses } from '../utils';
import { SectionTextFieldCardRootProps } from './index';

export const sectionOutlinedTextFieldCardClasses = getSectionControlCardClasses('OutlinedTextField');

export type SectionOutlinedTextFieldCardSlotProps = SectionControlCardSlotProps<typeof OutlinedInput>;

export type SectionOutlinedTextFieldCardProps =
    SectionCardProps
    & SectionTextFieldCardRootProps
    & SectionOutlinedTextFieldCardSlotProps;

export const SectionOutlinedTextFieldCard = (
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
    }: SectionOutlinedTextFieldCardProps
) => {
    const { components } = useContext(ConfigContext);

    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? components?.SectionOutlinedTextFieldCard?.variant ?? components?.SectionTextFieldCard?.variant}
            className={clsx(sectionOutlinedTextFieldCardClasses.root, className)}
            slots={slots}
            slotProps={slotProps}
            {...props}
        >
            {children}
            <OutlinedInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                size="small"
                margin="none"
                className={sectionOutlinedTextFieldCardClasses.control}
                sx={{ width: { xs: '100%', md: 300 } }}
                {...slotProps?.control}
            />
        </SectionCard>
    );
};
