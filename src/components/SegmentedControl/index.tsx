import { Box, BoxProps, ButtonBase, buttonBaseClasses, ButtonBaseProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { ItemDisabledProps, ItemRootProps, ItemVariableChoicesProps } from '../SectionItems';

export const segmentedControlClasses = {
    root: 'SegmentedControl-root',
    button: 'SegmentedControl-button',

    selected: 'SegmentedControl-selected',
    disabled: 'SegmentedControl-disabled'
};

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
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : '#282828',
    borderRadius: theme.spacing(1)
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
    color: selected ? theme.palette.text.primary : theme.palette.grey[600],
    backgroundColor: selected ? theme.palette.background.default : 'transparent',
    borderRadius: theme.spacing(.5),
    boxShadow: selected ? `0 ${theme.spacing(.25)} ${theme.spacing(.5)} rgba(0, 0, 0, .15)` : 'none',
    [`&:disabled, &.${buttonBaseClasses.disabled}`]: {
        color: theme.palette.action.disabled
    },
    '&:hover': {
        backgroundColor: !selected && theme.palette.action.hover
    },
    [`&.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.focus
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
