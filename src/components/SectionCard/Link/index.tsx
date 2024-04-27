'use client';

import { Link } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay, SectionCardDisplayIcon } from '../display';

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
        sx,
        slots,
        slotProps,
        ...props
    }: SectionLinkCardProps
) => {
    const { icons: { OpenInNew } } = useContext(ConfigContext);

    return (
        <SectionButtonCardRoot
            component={Link}
            disabled={disabled}
            className={clsx(sectionLinkCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={slots}
                slotProps={slotProps}
            />
            <SectionCardDisplayIcon sx={{ ml: 'auto' }}>
                <OpenInNew color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCardRoot>
    );
};
