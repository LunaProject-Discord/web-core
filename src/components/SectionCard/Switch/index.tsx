'use client';

import { Switch, switchClasses } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCard, SectionButtonCardProps } from '../Button';
import { SectionCardVariableProps } from '../index';
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
        disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionSwitchCardProps
) => {
    const { components } = useContext(ConfigContext);

    const handleChange = useCallback(() => setChecked(!checked), [setChecked, checked]);

    return (
        <SectionButtonCard
            onClick={handleChange}
            disabled={disabled}
            variant={variant ?? components?.SectionSwitchCard?.variant}
            className={clsx(sectionSwitchCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            slots={slots}
            slotProps={slotProps}
            {...props}
        >
            {children}
            <Switch
                component={slots?.control}
                checked={checked}
                onChange={handleChange}
                defaultChecked={defaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionSwitchCardClasses.control}
                sx={{ [`& .${switchClasses.switchBase}`]: { backgroundColor: 'transparent !important' } }}
                {...slotProps?.control}
            />
        </SectionButtonCard>
    );
};
