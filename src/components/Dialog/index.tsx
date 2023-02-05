'use client';

import { CloseOutlined } from '@mui/icons-material';
import {
    Dialog as MuiDialog,
    DialogActions as MuiDialogActions,
    dialogActionsClasses,
    DialogActionsProps,
    dialogContentClasses,
    DialogTitle,
    IconButton,
    styled
} from '@mui/material';
import React, { ReactNode } from 'react';

export interface DialogProps {
    open: boolean;
    onClose: () => void;
}

export const Dialog = styled(MuiDialog)(({ theme }) => ({
    [`& .${dialogContentClasses.root}`]: {
        padding: theme.spacing(2)
    },
    [`& .${dialogActionsClasses.root}`]: {
        padding: theme.spacing(1)
    }
}));

interface DialogHeaderProps {
    children?: ReactNode;
    onClose?: () => void;
}

export const DialogHeader = ({ children, onClose }: DialogHeaderProps) => (
    <DialogTitle sx={{ m: 0, p: 2 }}>
        {children}
        {onClose && <IconButton onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
            <CloseOutlined />
        </IconButton>}
    </DialogTitle>
);

export const DialogActions = styled(
    (props: DialogActionsProps) => <MuiDialogActions disableSpacing {...props} />
)<DialogActionsProps>(({ theme }) => ({
    gap: theme.spacing(1)
}));
