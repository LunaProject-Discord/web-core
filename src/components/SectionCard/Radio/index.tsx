'use client';

import { Radio } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay } from '../display';
import { SectionCardContent, SectionCardVariableProps } from '../index';
import { getSectionControlCardClasses, SectionControlCardSlotsAndSlotProps } from '../utils';

export const sectionRadioCardClasses = getSectionControlCardClasses('Radio');

export interface SectionRadioCardRootProps<T> extends SectionCardVariableProps<{ selected: T }> {
    name: string;
    value: T;
}

export type SectionRadioCardSlotsAndSlotProps = SectionControlCardSlotsAndSlotProps<typeof Radio>;

export type SectionRadioCardProps<T> = Omit<SectionButtonCardProps & SectionRadioCardRootProps<T> & SectionRadioCardSlotsAndSlotProps, 'component'>;

export const SectionRadioCard = <T, >(
    {
        icon,
        primary,
        secondary,
        children,
        name,
        value,
        selected,
        setSelected,
        disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionRadioCardProps<T>
) => {
    const { components } = useContext(ConfigContext);

    const handleChange = useCallback(() => setSelected(value), [setSelected, value]);

    return (
        <SectionButtonCardRoot
            onClick={handleChange}
            disabled={disabled}
            variant={variant ?? components?.SectionRadioCard?.variant ?? components?.SectionButtonCard?.variant ?? components?.SectionCard?.variant}
            className={clsx(sectionRadioCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <Radio
                component={slots?.control}
                name={name}
                value={value}
                checked={value === selected}
                onChange={handleChange}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionRadioCardClasses.control}
                sx={{
                    mx: .5,
                    p: 0,
                    display: 'flex',
                    placeItems: 'center',
                    placeContent: 'center',
                    flexShrink: 0,
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
                {...slotProps?.control}
            />
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={slots?.display}
                slotProps={slotProps?.display}
            />
            {children && <SectionCardContent component={slots?.content} {...slotProps?.content}>
                {children}
            </SectionCardContent>}
        </SectionButtonCardRoot>
    );
};
