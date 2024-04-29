'use client';

import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCard, SectionButtonCardProps } from '../Button';
import { SectionCardDisplayIcon } from '../display';

export const sectionLinkCardClasses = {
    root: 'SectionLinkCard-root'
};

export type SectionLinkCardProps = SectionButtonCardProps<'a'>;

export const SectionLinkCard = (
    {
        children,
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
        <SectionButtonCard
            component="a"
            disabled={disabled}
            className={clsx(sectionLinkCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            slots={slots}
            slotProps={slotProps}
            {...props}
        >
            {children}
            <SectionCardDisplayIcon>
                <OpenInNew color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCard>
    );
};
