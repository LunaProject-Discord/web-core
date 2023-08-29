'use client';

import {
    Dialog as MuiDialog,
    DialogActions as MuiDialogActions,
    dialogClasses,
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
    styled
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DialogV2 = styled(MuiDialog)(({ theme }) => ({
    [`& .${dialogClasses.paper}`]: {
        gap: theme.spacing(2)
    }
}));

export const DialogV2Title = styled(MuiDialogTitle)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(2, 2, 0),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
}));

export const DialogV2Content = styled(MuiDialogContent)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden auto'
}));

export const DialogV2Actions = styled(MuiDialogActions)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(0, 2, 2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    '& > :not(:first-of-type)': {
        margin: 0
    }
}));
