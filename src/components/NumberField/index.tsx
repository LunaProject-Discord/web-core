'use client';

import { styled } from '@mui/material';
import { generateComponentClasses } from '../../utils';
import { ButtonBase } from '../ButtonBase';
import { SectionCardDisabledProps, SectionCardVariableProps } from '../SectionCard';
import { OutlinedNumberField } from './outlined';

export const numberFieldClasses = generateComponentClasses(
    'NumberField',
    [
        'root',
        'field',
        'spinButton',
        'spinButtonIncrement',
        'spinButtonDecrement',

        'disabled',
        'variantStandard',
        'variantOutlined',
        'variantFilled'
    ]
);

export const SpinButton = styled(ButtonBase)({
    height: 20,
    borderRadius: 0
});

export interface NumberFieldRootProps extends SectionCardDisabledProps, SectionCardVariableProps<{ value: number; }> {
    disabledArrowKeys?: boolean;
    min?: number;
    max?: number;
    step?: number;
    shiftMultiplier?: number;
}

export const NumberField = OutlinedNumberField;

export * from './filled';
export * from './outlined';
