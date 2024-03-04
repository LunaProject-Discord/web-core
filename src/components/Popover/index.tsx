'use client';

import { Popover as MuiPopover, popoverClasses, PopoverProps as MuiPopoverProps, styled } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { borderAndBoxShadow } from '../../utils';
import { ModalProps } from '../Dialog';

export interface PopoverProps extends Partial<ModalProps>, Partial<Pick<MuiPopoverProps, 'anchorEl' | 'anchorOrigin' | 'anchorPosition' | 'anchorReference' | 'transformOrigin'>> {
    setAnchorEl?: Dispatch<SetStateAction<MuiPopoverProps['anchorEl']>>;
}

export const Popover = styled(MuiPopover)(({ theme }) => ({
    [`& .${popoverClasses.paper}`]: {
        ...borderAndBoxShadow(theme)
    }
}));
