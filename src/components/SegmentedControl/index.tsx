import { ButtonBase, buttonBaseClasses, ButtonBaseProps, styled } from '@mui/material';
import React, { ReactNode } from 'react';
import { ItemDisabledProps, ItemVariableProps } from '../SectionItems';

export const SegmentedControlRoot = styled('div')(({ theme }) => ({
    padding: theme.spacing(.5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : '#282828',
    borderRadius: theme.shape.borderRadius
}));

export interface SegmentedControlButtonProps {
    selected?: boolean;
}

export const SegmentedControlButton = styled(
    (props: ButtonBaseProps) => <ButtonBase disableRipple {...props} />,
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'selected' }
)<SegmentedControlButtonProps>(({ theme, selected }) => ({
    ...theme.typography.body1,
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
    borderRadius: theme.shape.borderRadius,
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

export interface SegmentedControlProps<T> extends ItemDisabledProps, ItemVariableProps<T> {
    choices: ({ value: T; children?: ReactNode; })[];
}

export const SegmentedControl = <T, >({ value, setValue, choices, disabled }: SegmentedControlProps<T>) => (
    <SegmentedControlRoot>
        {choices.map((choice) => (
            <SegmentedControlButton
                key={choice.value as string}
                selected={choice.value === value}
                onClick={() => setValue(choice.value)}
                disabled={disabled}
            >
                {choice.children}
            </SegmentedControlButton>
        ))}
    </SegmentedControlRoot>
);
