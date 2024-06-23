'use client';

import { Slider, sliderClasses, SliderProps, useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionCard,
    sectionCardClasses,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps,
    SectionCardVariableProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';

export const sectionSliderCardClasses = generateSectionControlCardClasses('Slider');

export interface SectionSliderCardRootProps {
    multiple?: boolean;
}

export interface SingleSectionSliderCardRootProps extends SectionSliderCardRootProps, SectionCardVariableProps<{
    value: number;
}> {
    multiple?: false;
}

export interface RangeSectionSliderCardRootProps extends SectionSliderCardRootProps, SectionCardVariableProps<{
    value: number[];
}> {
    multiple: true;
}

export type SectionSliderCardSlotProps = SectionControlCardSlotProps<typeof Slider>;

export type SectionSliderCardProps =
    SectionCardProps
    & (SingleSectionSliderCardRootProps | RangeSectionSliderCardRootProps)
    & SectionSliderCardSlotProps;

export const SectionSliderCard = (
    {
        children,
        value,
        setValue,
        multiple,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps: { control: controlProps, ...slotProps } = {},
        ...props
    }: SectionSliderCardProps
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots = {},
        slotProps: {
            control: configControlProps = {},
            ...configSlotProps
        } = {}
    } = components?.SectionSliderCard ?? {};

    const theme = useTheme();

    const handleChange: NonNullable<SliderProps['onChange']> = useCallback((_, value) => {
        if (multiple) {
            setValue(value as number[]);
        } else {
            setValue(value as number);
        }
    }, [multiple, setValue]);

    const disabled = _disabled ?? configDisabled;
    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? configVariant}
            className={clsx(sectionSliderCardClasses.root, className)}
            sx={{
                flexWrap: 'nowrap',
                [theme.breakpoints.down('md')]: {
                    flexWrap: 'wrap',
                    [`& .${sectionCardClasses.content}`]: {
                        width: '100%'
                    }
                },
                ...sx
            }}
            slots={merges(configSlots, slots)}
            slotProps={merges(configSlotProps, slotProps)}
            {...props}
        >
            {children}
            <Slider
                value={value}
                onChange={handleChange}
                disabled={disabled}
                valueLabelDisplay="auto"
                size="small"
                className={sectionSliderCardClasses.control}
                sx={(theme) => ({
                    width: '100%',
                    minWidth: 286,
                    mx: 1,
                    [`& .${sliderClasses.markLabel}`]: {
                        ...theme.typography.caption
                    }
                })}
                {...merges(configControlProps, controlProps)}
            />
        </SectionCard>
    );
};

export type SectionSliderCardConfigProps = Partial<Omit<SectionCardRootProps & SectionSliderCardSlotProps, keyof SectionCardDisplayRootProps>>;
