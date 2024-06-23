'use client';

import { Switch, switchClasses } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionButtonCard,
    SectionButtonCardProps,
    SectionCardDisplayRootProps,
    SectionCardRootProps,
    SectionCardVariableProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';

export const sectionSwitchCardClasses = generateSectionControlCardClasses('Switch');

export interface SectionSwitchCardRootProps extends SectionCardVariableProps<{ checked: boolean; }> {
    defaultChecked?: boolean;
}

export type SectionSwitchCardSlotProps = SectionControlCardSlotProps<typeof Switch>;

export type SectionSwitchCardProps = Omit<SectionButtonCardProps & SectionSwitchCardRootProps & SectionSwitchCardSlotProps, 'component'>;

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
        slots = {},
        slotProps: { control: controlProps = {}, ...slotProps } = {},
        ...props
    }: SectionSwitchCardProps
) => {
    const { components } = useContext(ConfigContext);
    const {
        defaultChecked: configDefaultChecked,
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots = {},
        slotProps: {
            control: configControlProps = {},
            ...configSlotProps
        } = {}
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
            slots={merges(configSlots, slots)}
            slotProps={merges(configSlotProps, slotProps)}
            {...props}
        >
            {children}
            <Switch
                checked={checked}
                onChange={handleChange}
                defaultChecked={defaultChecked ?? configDefaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionSwitchCardClasses.control}
                sx={{
                    mr: -.75,
                    [`& .${switchClasses.switchBase}`]: {
                        backgroundColor: 'transparent !important'
                    }
                }}
                {...merges(configControlProps, controlProps)}
            />
        </SectionButtonCard>
    );
};

export type SectionSwitchCardConfigProps = Partial<Omit<SectionCardRootProps & Pick<SectionSwitchCardRootProps, 'defaultChecked'> & SectionSwitchCardSlotProps, keyof SectionCardDisplayRootProps>>;
