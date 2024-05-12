'use client';

import { Switch, switchClasses } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCard, SectionButtonCardProps } from '../Button';
import { SectionCardDisplayRootProps, SectionCardRootProps, SectionCardVariableProps } from '../index';
import { getSectionControlCardClasses, SectionControlCardSlotsAndSlotProps } from '../utils';

export const sectionSwitchCardClasses = getSectionControlCardClasses('Switch');

export interface SectionSwitchCardRootProps extends SectionCardVariableProps<{ checked: boolean }> {
    defaultChecked?: boolean;
}

export type SectionSwitchCardSlotsAndSlotProps = SectionControlCardSlotsAndSlotProps<typeof Switch>;

export type SectionSwitchCardProps = Omit<SectionButtonCardProps & SectionSwitchCardRootProps & SectionSwitchCardSlotsAndSlotProps, 'component'>;

export const SectionSwitchCard = (
    {
        children,
        checked,
        setChecked,
        defaultChecked,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionSwitchCardProps
) => {
    const { components } = useContext(ConfigContext);
    const {
        defaultChecked: configDefaultChecked,
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionSwitchCard ?? {};

    const handleChange = useCallback(() => setChecked(!checked), [setChecked, checked]);

    const disabled = _disabled ?? configDisabled;
    return (
        <SectionButtonCard
            onClick={handleChange}
            disabled={disabled}
            variant={variant ?? configVariant}
            className={clsx(sectionSwitchCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            slots={slots ?? configSlots}
            slotProps={slotProps ?? configSlotProps}
            {...props}
        >
            {children}
            <Switch
                component={slots?.control ?? configSlots?.control ?? 'span'}
                checked={checked}
                onChange={handleChange}
                defaultChecked={defaultChecked ?? configDefaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionSwitchCardClasses.control}
                sx={{ [`& .${switchClasses.switchBase}`]: { backgroundColor: 'transparent !important' } }}
                {...(slotProps?.control ?? configSlotProps?.control)}
            />
        </SectionButtonCard>
    );
};

export type SectionSwitchCardConfigProps = Partial<Omit<SectionCardRootProps & Pick<SectionSwitchCardRootProps, 'defaultChecked'> & SectionSwitchCardSlotsAndSlotProps, keyof SectionCardDisplayRootProps>>;
