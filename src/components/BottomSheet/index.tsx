'use client';

import { alpha, Box, getOverlayAlpha, IconButton, styled, Tooltip } from '@mui/material';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, ComponentPropsWithRef, forwardRef, useContext } from 'react';
import { BottomSheet as BottomSheetRoot, BottomSheetRef } from 'react-spring-bottom-sheet';
import { SnapPointProps } from 'react-spring-bottom-sheet/dist/types';
import { ConfigContext, generateComponentClasses } from '../../utils';

export const bottomSheetClasses = generateComponentClasses(
    'BottomSheet',
    [
        'root',
        'content'
    ]
);

export const BottomSheet = styled(
    // eslint-disable-next-line react/display-name
    forwardRef<BottomSheetRef, ComponentPropsWithoutRef<typeof BottomSheetRoot>>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <BottomSheetRoot
            ref={ref}
            className={clsx(bottomSheetClasses.root, className)}
            {...props}
        />
    ))
)(({ theme }) => ({
    '--rsbs-bg': (theme.vars || theme).palette.background.paper,
    '--rsbs-handle-bg': (theme.vars || theme).palette.divider,
    '--rsbs-overlay-rounded': `${theme.spacing(1.5)} !important`,
    [theme.breakpoints.up('sm')]: {
        '--rsbs-max-w': '400px',
        '--rsbs-ml': 'auto',
        '--rsbs-mr': theme.spacing(3)
    },
    '& [data-rsbs-overlay], &::after': {
        backgroundImage: 'none',
        ...theme.applyStyles('dark', {
            backgroundImage: theme.vars ? theme.vars.overlays[8] : `linear-gradient(${alpha('#fff', getOverlayAlpha(8))}, ${alpha('#fff', getOverlayAlpha(8))})`
        })
    },
    '&[data-rsbs-has-header="true"] [data-rsbs-header]': {
        height: theme.spacing(9),
        boxShadow: `0 1px 0 ${(theme.vars || theme).palette.divider}`
    },
    '& [data-rsbs-scroll]': {
        overflow: 'hidden'
    }
}));

export interface BottomSheetHeaderToggleButtonProps {
    expanded: boolean;
    setExpanded: (open: boolean) => void;
}

export const BottomSheetHeaderToggleButton = (
    {
        expanded,
        setExpanded
    }: BottomSheetHeaderToggleButtonProps
) => {
    const { icons: { ExpandMore }, translations } = useContext(ConfigContext);

    return (
        <Tooltip title={!expanded ? translations.open : translations.close}>
            <IconButton
                onClick={() => setExpanded(!expanded)}
                sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    transition: (theme) => theme.transitions.create('transform', {
                        duration: theme.transitions.duration.shortest
                    }),
                    transform: !expanded ? 'scale(1, -1)' : undefined
                }}
            >
                <ExpandMore />
            </IconButton>
        </Tooltip>
    );
};

export const BottomSheetContent = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof Box>) => (
        <Box
            className={clsx(bottomSheetClasses.content, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
}));

export const defaultSnapPoints = (
    {
        minHeight,
        maxHeight,
        headerHeight
    }: SnapPointProps
) => [Math.min(maxHeight - 8 * 9, minHeight), headerHeight];
