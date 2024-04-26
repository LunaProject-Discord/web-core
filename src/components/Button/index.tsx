import { LoadingButton as MuiLoadingButton } from '@mui/lab';
import { Button as MuiButton, styled, Theme } from '@mui/material';

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
        return '10000px';

    if (typeof corner === 'string')
        return corner;
    if (typeof corner === 'number')
        return radius * corner;
    return corner(theme);
};

export const Button = styled(MuiButton)<ButtonRootProps>(({ theme, corners }) => ({
    ...(typeof corners === 'object' ? {
        borderTopLeftRadius: getCorner(corners.topLeft, theme),
        borderTopRightRadius: getCorner(corners.topRight, theme),
        borderBottomLeftRadius: getCorner(corners.bottomLeft, theme),
        borderBottomRightRadius: getCorner(corners.bottomRight, theme)
    } : {
        borderRadius: getCorner(corners, theme)
    })
})) as typeof MuiButton & ButtonRootProps;

export const LoadingButton = styled(MuiLoadingButton)<ButtonRootProps>(({ theme, corners }) => ({
    ...(typeof corners === 'object' ? {
        borderTopLeftRadius: getCorner(corners.topLeft, theme),
        borderTopRightRadius: getCorner(corners.topRight, theme),
        borderBottomLeftRadius: getCorner(corners.bottomLeft, theme),
        borderBottomRightRadius: getCorner(corners.bottomRight, theme)
    } : {
        borderRadius: getCorner(corners, theme)
    })
})) as typeof MuiLoadingButton & ButtonRootProps;
