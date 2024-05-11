'use client';

import { Radio } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay, SectionCardDisplayRootProps } from '../display';
import { SectionCardContent, SectionCardRootProps, SectionCardVariableProps } from '../index';
import { getSectionControlCardClasses, SectionControlCardSlotsAndSlotProps } from '../utils';

export const sectionRadioCardClasses = getSectionControlCardClasses('Radio');

export interface SectionRadioCardRootProps<T> extends SectionCardVariableProps<{ selected: T }> {
    name: string;
    value: T;
}

export type SectionRadioCardSlotsAndSlotProps = SectionControlCardSlotsAndSlotProps<typeof Radio>;

export type SectionRadioCardProps<T> = Omit<Omit<SectionButtonCardProps, 'value'> & SectionRadioCardRootProps<T> & SectionRadioCardSlotsAndSlotProps, 'component'>;

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
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionRadioCardProps<T>
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: configRootSlots,
        slotProps: configRootSlotProps
    } = components?.SectionCard ?? {};
    const {
        disabled: configButtonDisabled,
        variant: configButtonVariant,
        slots: configButtonSlots,
        slotProps: configButtonSlotProps
    } = components?.SectionButtonCard ?? {};
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionRadioCard ?? {};

    const handleChange = useCallback(() => setSelected(value), [setSelected, value]);

    const disabled = _disabled ?? configDisabled ?? configButtonDisabled ?? configRootDisabled;
    return (
        <SectionButtonCardRoot
            onClick={handleChange}
            disabled={disabled}
            variant={variant ?? configVariant ?? configButtonVariant ?? configRootVariant}
            className={clsx(sectionRadioCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <Radio
                component={slots?.control ?? configSlots?.control}
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
                {...(slotProps?.control ?? configSlotProps?.control)}
            />
            <SectionCardDisplay
                icon={icon}
                primary={primary}
                secondary={secondary}
                slots={slots?.display ?? configSlots?.display ?? configButtonSlots?.display ?? configRootSlots?.display}
                slotProps={slotProps?.display ?? configSlotProps?.display ?? configButtonSlotProps?.display ?? configRootSlotProps?.display}
            />
            {children && <SectionCardContent
                component={slots?.content ?? configSlots?.content ?? configButtonSlots?.content ?? configRootSlots?.content}
                {...(slotProps?.content ?? configSlotProps?.content ?? configButtonSlotProps?.content ?? configRootSlotProps?.content)}
            >
                {children}
            </SectionCardContent>}
        </SectionButtonCardRoot>
    );
};

export type SectionRadioCardConfigProps = Partial<Omit<SectionCardRootProps & SectionRadioCardSlotsAndSlotProps, keyof SectionCardDisplayRootProps>>;
