'use client';

import { Box, BoxProps, InputBase, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ChangeEvent, forwardRef, useContext } from 'react';
import { ConfigContext, generateComponentClasses } from '../../utils';
import { SectionCardDisabledProps, SectionCardVariableProps } from '../SectionCard';

export const pickerSearchBoxClasses = generateComponentClasses(
    'PickerSearchBox',
    [
        'root',
        'input'
    ]
);

export const PickerSearchBoxRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(pickerSearchBoxClasses.root, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    backgroundColor: (theme.vars || theme).palette.grey[100],
    ...theme.applyStyles('dark', {
        backgroundColor: (theme.vars || theme).palette.grey[900]
    })
}));

export interface PickerSearchBoxProps extends SectionCardVariableProps<{ value: string; }>, SectionCardDisabledProps {
    placeholder?: string;
}

export const PickerSearchBox = forwardRef<HTMLInputElement, PickerSearchBoxProps>((
    {
        value,
        setValue,
        disabled,
        placeholder
    },
    ref
) => {
    const { icons: { Search } } = useContext(ConfigContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    return (
        <PickerSearchBoxRoot>
            <Search color="action" />
            <InputBase
                inputRef={ref}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                fullWidth
                className={pickerSearchBoxClasses.input}
            />
        </PickerSearchBoxRoot>
    );
});
PickerSearchBox.displayName = 'PickerSearchBox';
