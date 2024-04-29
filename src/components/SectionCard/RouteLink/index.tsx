'use client';

import clsx from 'clsx';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCard, SectionButtonCardProps } from '../Button';
import { SectionCardDisplayIcon } from '../display';

export const sectionRouteLinkCardClasses = {
    root: 'SectionLinkCard-root'
};

export type SectionRouteLinkCardProps = SectionButtonCardProps<typeof NextLink>;

export const SectionRouteLinkCard = (
    {
        children,
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
        <SectionButtonCard
            component={NextLink}
            disabled={disabled}
            className={clsx(sectionRouteLinkCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            slots={slots}
            slotProps={slotProps}
            {...props}
        >
            {children}
            <SectionCardDisplayIcon>
                <More color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCard>
    );
};
