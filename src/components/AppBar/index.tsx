'use client';

import { AppBar as MuiAppBar, Box, styled } from '@mui/material';
import { RouteLink } from '../Link';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
    borderBottom: `solid 1px ${theme.palette.divider}`,
    background: theme.palette.background.default,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
    zIndex: theme.zIndex.drawer + 1
}));

interface AppBarBrandProps {
    src: string;
}

export const AppBarBrand = styled(
    RouteLink,
    { shouldForwardProp: (prop) => prop !== 'src' }
)<AppBarBrandProps>(({ theme, src }) => ({
    width: 170,
    height: 50,
    background: `url(${src}) center center / contain no-repeat`,
    [theme.breakpoints.up('md')]: {
        width: 200
    }
}));

export const AppBarButtonContainer = styled(Box)(({ theme }) => ({
    margin: theme.spacing(0, 1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1)
}));
