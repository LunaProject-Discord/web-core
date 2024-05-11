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

export type SectionRouteLinkCardProps = Omit<SectionButtonCardProps<typeof NextLink>, 'component'>;

export const SectionRouteLinkCard = (
    {
        children,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionRouteLinkCardProps
) => {
    const { components, icons: { More } } = useContext(ConfigContext);
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionRouteLinkCard ?? {};

    const disabled = _disabled ?? configDisabled;
    return (
        <SectionButtonCard
            component={NextLink}
            disabled={disabled}
            variant={variant ?? configVariant}
            className={clsx(sectionRouteLinkCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            slots={slots ?? configSlots}
            slotProps={slotProps ?? configSlotProps}
            {...props}
        >
            {children}
            <SectionCardDisplayIcon>
                <More color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCard>
    );
};
