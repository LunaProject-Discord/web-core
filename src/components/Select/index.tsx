'use client';

import { Select as MuiSelect, SelectProps } from '@mui/material';
import React from 'react';
import { borderAndBoxShadow } from '../../utils';

export const Select = <T, >({ MenuProps, ...props }: SelectProps) => (
    <MuiSelect
        MenuProps={{
            ...MenuProps,
            PaperProps: {
                ...MenuProps?.PaperProps,
                sx: (theme) => borderAndBoxShadow(theme)
            }
        }}
        {...props}
    />
);
