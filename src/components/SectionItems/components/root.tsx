import { Box, ButtonBase as MuiButtonBase, buttonBaseClasses, CSSObject, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const itemRootStyled = (theme: Theme): CSSObject => ({
    padding: theme.spacing(0, 1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    gap: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.shortest
    }),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
});

export interface ItemRootProps {
    sx?: SxProps<Theme>;
}

export const ItemRoot = styled(Box)(({ theme }) => itemRootStyled(theme));

export const ButtonItemRoot = styled(MuiButtonBase)(({ theme }) => ({
    ...itemRootStyled(theme),
    userSelect: 'none',
    [`&.${buttonBaseClasses.disabled}`]: {
        color: theme.palette.action.disabled
    },
    [`&:hover, &.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.hover
    }
}));
