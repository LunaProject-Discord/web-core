'use client';

import clsx from 'clsx';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import { ConfigContext, generateComponentClasses } from '../../../utils';
import { merges, SectionButtonCard, SectionButtonCardProps, SectionCardDisplayIcon } from '../index';

export const sectionRouteLinkCardClasses = generateComponentClasses('SectionRouteLinkCard', ['root']);

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
            slots={merges(configSlots, slots)}
            slotProps={merges(configSlotProps, slotProps)}
            {...props}
        >
            {children}
            <SectionCardDisplayIcon>
                <More color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCard>
    );
};
