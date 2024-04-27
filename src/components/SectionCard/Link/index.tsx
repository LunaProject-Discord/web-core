'use client';

import { Link } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay } from '../display';

export const sectionLinkCardClasses = {
    root: 'SectionLinkCard-root'
};

export type SectionLinkCardProps = SectionButtonCardProps<typeof Link>;

export const SectionLinkCard = (
    {
        icon,
        primary,
        secondary,
        disabled,
        className,
        slots,
        slotProps,
        ...props
    }: SectionLinkCardProps
) => (
    <SectionButtonCardRoot
        disabled={disabled}
        className={clsx(sectionLinkCardClasses.root, className)}
        component={Link}
        {...props}
    >
        <SectionCardDisplay
            icon={icon}
            primary={primary}
            secondary={secondary}
            slots={slots}
            slotProps={slotProps}
        />
    </SectionButtonCardRoot>
);
