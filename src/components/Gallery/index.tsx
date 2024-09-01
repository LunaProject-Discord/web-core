'use client';

import { Box, buttonBaseClasses, styled } from '@mui/material';
import React from 'react';

export const Gallery = styled(
    ({ component: Component = 'ul', ...props }: any) => (<Component {...props} />)
)(({ theme }) => ({
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(3),
    listStyle: 'none'
}));

export const GalleryItem = styled(
    ({ component: Component = 'li', ...props }: any) => (<Component {...props} />)
)(({ theme }) => ({
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    color: (theme.vars || theme).palette.text.primary,
    textAlign: 'center',
    textDecoration: 'none',
    border: `solid 1px ${(theme.vars || theme).palette.divider}`,
    borderRadius: theme.spacing(.5),
    boxShadow: `0 ${theme.spacing(.5)} ${theme.spacing(1)} rgba(0, 0, 0, .15)`,
    [`& .${buttonBaseClasses.root}`]: {
        display: 'inherit',
        flexDirection: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit',
        borderRadius: 'inherit'
    }
}));

export const GalleryItemIcon = styled(
    ({ component: Component = Box, ...props }: any) => (<Component {...props} />)
)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(3),
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    backgroundColor: (theme.vars || theme).palette.grey[100],
    borderRadius: theme.spacing(.5, .5, 0, 0),
    ...theme.applyStyles('dark', {
        backgroundColor: (theme.vars || theme).palette.grey[900]
    })
}));

export const GalleryItemText = styled(
    ({ component: Component = Box, ...props }: any) => (<Component {...props} />)
)(({ theme }) => ({
    ...theme.typography.body1,
    height: '100%',
    minHeight: theme.spacing(10),
    margin: 0,
    padding: theme.spacing(1),
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    borderRadius: theme.spacing(0, 0, .5, .5)
}));
