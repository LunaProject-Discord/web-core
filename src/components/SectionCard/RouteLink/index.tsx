'use client';

import clsx from 'clsx';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay, SectionCardDisplayIcon } from '../display';

export const sectionRouteLinkCardClasses = {
    root: 'SectionLinkCard-root'
};

export type SectionRouteLinkCardProps = SectionButtonCardProps<typeof NextLink>;

export const SectionRouteLinkCard = (
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
    }: SectionRouteLinkCardProps
) => {
    const { icons: { More } } = useContext(ConfigContext);

    return (
        <SectionButtonCardRoot
            component={NextLink}
            disabled={disabled}
            className={clsx(sectionRouteLinkCardClasses.root, className)}
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
                <More color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCardRoot>
    );
};
