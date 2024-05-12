'use client';

import { Checkbox } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay, SectionCardDisplayRootProps } from '../display';
import { SectionCardContent, SectionCardRootProps } from '../index';
import { SectionSwitchCardRootProps } from '../Switch';
import { getSectionControlCardClasses, SectionControlCardSlotsAndSlotProps } from '../utils';

export const sectionCheckboxCardClasses = getSectionControlCardClasses('Checkbox');

export type SectionCheckboxCardSlotsAndSlotProps = SectionControlCardSlotsAndSlotProps<typeof Checkbox>;

export type SectionCheckboxCardProps = Omit<SectionButtonCardProps & SectionSwitchCardRootProps & SectionCheckboxCardSlotsAndSlotProps, 'component'>;

export const SectionCheckboxCard = (
    {
        icon,
        primary,
        secondary,
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
    }: SectionCheckboxCardProps
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
        defaultChecked: configDefaultChecked,
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionCheckboxCard ?? {};

    const handleChange = useCallback(() => setChecked(!checked), [setChecked, checked]);

    const disabled = _disabled ?? configDisabled ?? configButtonDisabled ?? configRootDisabled;
    return (
        <SectionButtonCardRoot
            onClick={handleChange}
            disabled={disabled}
            variant={variant ?? configVariant ?? configButtonVariant ?? configRootVariant}
            className={clsx(sectionCheckboxCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            {...props}
        >
            <Checkbox
                component={slots?.control ?? configSlots?.control ?? 'span'}
                checked={checked}
                onChange={handleChange}
                defaultChecked={defaultChecked ?? configDefaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionCheckboxCardClasses.control}
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

export type SectionCheckboxCardConfigProps = Partial<Omit<SectionCardRootProps & Pick<SectionSwitchCardRootProps, 'defaultChecked'> & SectionCheckboxCardSlotsAndSlotProps, keyof SectionCardDisplayRootProps>>;
