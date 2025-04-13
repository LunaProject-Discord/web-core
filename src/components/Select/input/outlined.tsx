'use client';

import { Box, BoxProps, SlotComponentProps, styled, typographyClasses } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { ConfigContext, generateComponentClasses } from '../../../utils';
import { SlotRootProps } from '../../SectionCard';
import { SelectInputProps, SelectInputRootProps } from './index';

export const selectOutlinedInputClasses = generateComponentClasses(
    'SelectOutlinedInput',
    [
        'root',
        'icon',
        'content',
        'outline',

        'open',
        'disabled'
    ]
);

export const SelectOutlinedInputRoot = styled(
    ({ className, ...props }: BoxProps & SelectInputRootProps) => (
        <Box
            className={
                clsx(
                    selectOutlinedInputClasses.root,
                    props.open && selectOutlinedInputClasses.open,
                    props.disabled && selectOutlinedInputClasses.disabled,
                    className
                )
            }
            {...props}
        />
    )
)<BoxProps & SelectInputRootProps>(({ theme }) => ({
    height: theme.spacing(5),
    padding: theme.spacing(1.0625, 4, 1.0625, 1.75),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    userSelect: 'none',
    cursor: 'pointer',
    color: (theme.vars || theme).palette.text.primary,
    [`&.${selectOutlinedInputClasses.open}`]: {
        [`& .${selectOutlinedInputClasses.icon}`]: {
            transform: 'rotate(180deg)'
        },
        [`&:not(.${selectOutlinedInputClasses.disabled}) .${selectOutlinedInputClasses.outline}`]: {
            borderWidth: 2,
            borderColor: (theme.vars || theme).palette.primary.main
        }
    },
    [`&:not(.${selectOutlinedInputClasses.open}):not(.${selectOutlinedInputClasses.disabled}):hover .${selectOutlinedInputClasses.outline}`]: {
        borderColor: (theme.vars || theme).palette.text.primary
    },
    [`&.${selectOutlinedInputClasses.disabled}`]: {
        cursor: 'default',
        color: (theme.vars || theme).palette.text.disabled,
        [`& .${selectOutlinedInputClasses.icon}`]: {
            color: (theme.vars || theme).palette.text.disabled
        }
    }
}));

export const SelectOutlinedInputIcon = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(selectOutlinedInputClasses.icon, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(.875),
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    color: (theme.vars || theme).palette.action.active
}));

export const SelectOutlinedInputContent = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(selectOutlinedInputClasses.content, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    overflow: 'hidden',
    [`& .${typographyClasses.root}`]: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
}));

export const SelectOutlinedInputOutline = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(selectOutlinedInputClasses.outline, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    minWidth: '0%',
    padding: theme.spacing(0, 1),
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0 0 0 / .23)',
    borderRadius: theme.shape.borderRadius,
    ...theme.applyStyles('dark', {
        borderColor: 'rgb(255 255 255 / .23)'
    })
}));

export interface SelectOutlinedInputSlotProps {
    slotProps?: {
        root?: SlotComponentProps<typeof Box, SlotRootProps, {}>;
        icon?: SlotComponentProps<typeof Box, SlotRootProps, {}>;
        content?: SlotComponentProps<typeof Box, SlotRootProps, {}>;
        outline?: SlotComponentProps<typeof Box, SlotRootProps, {}>;
    };
}

export type SelectOutlinedInputProps = SelectInputProps & SelectOutlinedInputSlotProps;

export const SelectOutlinedInput = forwardRef<HTMLDivElement, SelectOutlinedInputProps>((
    {
        open,
        onClick,
        disabled,
        children,
        slotProps,
        ...props
    },
    ref
) => {
    const { icons: { ArrowDropDown } } = useContext(ConfigContext);

    return (
        <SelectOutlinedInputRoot
            ref={ref}
            open={Boolean(open)}
            onClick={!disabled ? onClick : undefined}
            disabled={Boolean(disabled)}
            tabIndex={0}
            {...slotProps?.root}
            {...props}
        >
            <SelectOutlinedInputContent {...slotProps?.content}>{children}</SelectOutlinedInputContent>
            <SelectOutlinedInputIcon {...slotProps?.icon}>
                <ArrowDropDown />
            </SelectOutlinedInputIcon>
            <SelectOutlinedInputOutline {...slotProps?.outline} />
        </SelectOutlinedInputRoot>
    );
});
SelectOutlinedInput.displayName = 'Select';
