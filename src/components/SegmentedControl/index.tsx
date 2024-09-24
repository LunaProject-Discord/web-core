import { Box, BoxProps, ButtonBase, buttonBaseClasses, ButtonBaseProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { generateComponentClasses } from '../../utils';
import { ItemDisabledProps, ItemRootProps, ItemVariableChoicesProps } from '../SectionItems';

export const segmentedControlClasses = generateComponentClasses(
    'SegmentedControl',
    [
        'root',
        'button',

        'selected',
        'disabled'
    ]
);

export const SegmentedControlRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(segmentedControlClasses.root, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(.5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: (theme.vars || theme).palette.grey[200],
    borderRadius: theme.spacing(1),
    ...theme.applyStyles('dark', {
        backgroundColor: '#282828'
    })
}));

export interface SegmentedControlButtonProps extends ButtonBaseProps {
    selected?: boolean;
}

export const SegmentedControlButton = styled(
    ({ disabled, className, ...props }: ButtonBaseProps) => (
        <ButtonBase
            disabled={disabled}
            disableRipple
            className={clsx(segmentedControlClasses.button, disabled && segmentedControlClasses.disabled, className)}
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'selected' }
)<SegmentedControlButtonProps>(({ theme, selected }) => ({
    ...theme.typography.body1,
    height: '100%',
    padding: theme.spacing(.75, 1.5),
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    gap: theme.spacing(.5),
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.shortest
    }),
    fontWeight: 500,
    color: selected ? (theme.vars || theme).palette.text.primary : (theme.vars || theme).palette.grey[600],
    backgroundColor: selected ? (theme.vars || theme).palette.background.default : 'transparent',
    borderRadius: theme.spacing(.5),
    boxShadow: selected ? `0 ${theme.spacing(.25)} ${theme.spacing(.5)} rgb(0 0 0 / .15)` : 'none',
    [`&:disabled, &.${buttonBaseClasses.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled
    },
    '&:hover': {
        backgroundColor: !selected && (theme.vars || theme).palette.action.hover
    },
    [`&.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus
    }
}));

export type SegmentedControlProps<T> = ItemRootProps & ItemDisabledProps & ItemVariableChoicesProps<T>;

export const SegmentedControl = <T, >(
    {
        value,
        setValue,
        choices,
        disabled,
        className,
        sx
    }: SegmentedControlProps<T>
) => (
    <SegmentedControlRoot className={clsx(disabled && segmentedControlClasses.disabled, className)} sx={sx}>
        {choices.map((choice) => (
            <SegmentedControlButton
                key={choice.value as string}
                selected={choice.value === value}
                onClick={() => setValue(choice.value)}
                disabled={disabled || choice.disabled}
                className={choice.value === value ? segmentedControlClasses.selected : undefined}
                sx={choice.sx}
            >
                {choice.children}
            </SegmentedControlButton>
        ))}
    </SegmentedControlRoot>
);
