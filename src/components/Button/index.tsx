import { LoadingButton as MuiLoadingButton, LoadingButtonProps } from '@mui/lab';
import { Button as MuiButton, ButtonProps, styled, Theme } from '@mui/material';
import React, { ElementType } from 'react';

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
    if (!corner || corner === 'rounded')
        return 1;
    if (corner === 'square')
        return 0;
    if (corner === 'extended')
        return 10000;

    return typeof corner === 'function' ? corner(theme) : corner;
};

export const Button = <C extends ElementType, >(
    {
        corners,
        sx,
        ...props
    }: ButtonRootProps & ButtonProps<C, { components?: C }>
) => (
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

export const Button2 = styled(MuiButton)<ButtonRootProps>(({ theme, corners }) => ({
    ...(typeof corners === 'object' ? {
        borderTopLeftRadius: getCorner(corners.topLeft, theme),
        borderTopRightRadius: getCorner(corners.topRight, theme),
        borderBottomLeftRadius: getCorner(corners.bottomLeft, theme),
        borderBottomRightRadius: getCorner(corners.bottomRight, theme)
    } : {
        borderRadius: getCorner(corners, theme)
    })
})) as typeof Button;

export const LoadingButton = <C extends ElementType, >(
    {
        corners,
        sx,
        ...props
    }: ButtonRootProps & LoadingButtonProps<C, { components?: C }>
) => (
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

export const LoadingButton2 = styled(MuiLoadingButton)<ButtonRootProps>(({ theme, corners }) => ({
    ...(typeof corners === 'object' ? {
        borderTopLeftRadius: getCorner(corners.topLeft, theme),
        borderTopRightRadius: getCorner(corners.topRight, theme),
        borderBottomLeftRadius: getCorner(corners.bottomLeft, theme),
        borderBottomRightRadius: getCorner(corners.bottomRight, theme)
    } : {
        borderRadius: getCorner(corners, theme)
    })
})) as typeof LoadingButton;
