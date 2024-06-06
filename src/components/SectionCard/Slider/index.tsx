'use client';

import { Slider, SliderProps, useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionCard,
    sectionCardClasses,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps,
    SectionCardVariableProps,
    SectionControlCardSlotProps
} from '../index';
import { generateSectionControlCardClasses } from '../utils';

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
        slotProps,
        ...props
    }: SectionSliderCardProps
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
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
            slots={slots ?? configSlots}
            slotProps={slotProps ?? configSlotProps}
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
                sx={{ width: '100%', minWidth: 300 }}
                {...(slotProps?.control ?? configSlotProps?.control)}
            />
        </SectionCard>
    );
};

export type SectionSliderCardConfigProps = Partial<Omit<SectionCardRootProps & SectionSliderCardSlotProps, keyof SectionCardDisplayRootProps>>;
