'use client';

import { paperClasses, Select as MuiSelect, styled } from '@mui/material';
import React from 'react';
import { borderAndBoxShadow } from '../../utils';

export const Select = styled(MuiSelect)(({ theme }) => ({
    [`& .${paperClasses.root}`]: {
        ...borderAndBoxShadow(theme)
    }
})) as unknown as typeof MuiSelect;
