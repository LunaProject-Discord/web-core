'use client';

import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext, generateComponentClasses } from '../../../utils';
import { merges, SectionButtonCard, SectionButtonCardProps, SectionCardDisplayIcon } from '../index';

export const sectionLinkCardClasses = generateComponentClasses('SectionLinkCard', ['root']);

export type SectionLinkCardProps = Omit<SectionButtonCardProps<'a'>, 'component'>;

export const SectionLinkCard = (
    {
        children,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionLinkCardProps
) => {
    const { components, icons: { OpenInNew } } = useContext(ConfigContext);
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionLinkCard ?? {};

    const disabled = _disabled ?? configDisabled;
    return (
        <SectionButtonCard
            component="a"
            disabled={disabled}
            variant={variant ?? configVariant}
            className={clsx(sectionLinkCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            slots={merges(configSlots, slots)}
            slotProps={merges(configSlotProps, slotProps)}
            {...props}
        >
            {children}
            <SectionCardDisplayIcon>
                <OpenInNew color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCard>
    );
};
