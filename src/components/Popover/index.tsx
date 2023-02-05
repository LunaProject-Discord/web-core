'use client';

import { Popover as MuiPopover, popoverClasses, styled } from '@mui/material';

export const Popover = styled(MuiPopover)(({ theme }) => ({
    [`& .${popoverClasses.paper}`]: {
        border: `solid 1px ${theme.palette.divider}`,
        boxShadow: `0 ${theme.spacing(.5)} ${theme.spacing(1)} rgba(0, 0, 0, .15)`
    }
}));
