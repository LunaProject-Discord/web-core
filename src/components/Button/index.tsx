import { LoadingButton as MuiLoadingButton, LoadingButtonProps } from '@mui/lab';
import { Button as MuiButton, ButtonProps, Theme } from '@mui/material';
import React from 'react';

export type ButtonCornerType =
    undefined
    | 'square'
    | 'rounded'
    | 'extended'
    | string
    | number
    | ((theme: Theme) => string | number);

export interface ButtonRootProps {
    corners?: ButtonCornerType | {
        topLeft?: ButtonCornerType;
        topRight?: ButtonCornerType;
        bottomLeft?: ButtonCornerType;
        bottomRight?: ButtonCornerType;
    };
}

export const getCorner = (corner: ButtonCornerType, theme: Theme) => {
    const radius = theme.shape.borderRadius;

    if (!corner || corner === 'rounded')
        return radius;
    if (corner === 'square')
        return 0;
    if (corner === 'extended')
        return radius * 10000;

    if (typeof corner === 'string')
        return corner;
    if (typeof corner === 'number')
        return radius * corner;
    return corner(theme);
};

export const Button = ({ corners, sx, ...props }: ButtonRootProps & ButtonProps) => (
    <MuiButton
        {...props}
        sx={(theme) => ({
            ...(corners && {
                ...(typeof corners === 'object' ? {
                    borderTopLeftRadius: getCorner(corners.topLeft, theme),
                    borderTopRightRadius: getCorner(corners.topRight, theme),
                    borderBottomLeftRadius: getCorner(corners.bottomLeft, theme),
                    borderBottomRightRadius: getCorner(corners.bottomRight, theme)
                } : {
                    borderRadius: getCorner(corners, theme)
                })
            }),
            ...sx
        })}
    />
);

export const LoadingButton = ({ corners, sx, ...props }: ButtonRootProps & LoadingButtonProps) => (
    <MuiLoadingButton
        {...props}
        sx={(theme) => ({
            ...(corners && {
                ...(typeof corners === 'object' ? {
                    borderTopLeftRadius: getCorner(corners.topLeft, theme),
                    borderTopRightRadius: getCorner(corners.topRight, theme),
                    borderBottomLeftRadius: getCorner(corners.bottomLeft, theme),
                    borderBottomRightRadius: getCorner(corners.bottomRight, theme)
                } : {
                    borderRadius: getCorner(corners, theme)
                })
            }),
            ...sx
        })}
    />
);
