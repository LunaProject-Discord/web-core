'use client';

import { Box, BoxProps, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { ItemIconProps, ItemRootProps, ItemTextBlockProps } from './components';

export type ItemProps = ItemRootProps & ItemIconProps & ItemTextBlockProps & ItemDisabledProps;

export interface ItemDisabledProps {
    disabled?: boolean;
}

export interface ItemVariableProps<T> {
    value: T;
    setValue: Dispatch<SetStateAction<T>>;
}

export interface ItemVariableChoiceProps<T> extends ItemDisabledProps {
    value: T;
    children?: ReactNode;
    sx?: SxProps<Theme>;
}

export interface ItemVariableChoicesProps<T> extends ItemVariableProps<T> {
    choices: ItemVariableChoiceProps<T>[];
}

export const sectionItemClasses = {
    root: 'SectionItem-root',
    buttonRoot: 'SectionItem-buttonRoot',
    rowContainer: 'SectionItem-rowContainer',
    formContainer: 'SectionItem-formContainer',

    disabled: 'SectionItem-disabled'
};

export interface ItemRowContainerProps extends BoxProps {
    dense?: boolean;
}

export const ItemRowContainer = styled(
    ({ className, ...props }: ItemRowContainerProps) => (
        <Box
            className={clsx(sectionItemClasses.rowContainer, className)}
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'dense' }
)<ItemRowContainerProps>(({ theme, dense = false }) => ({
    width: '100%',
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
        marginBottom: dense ? theme.spacing(-2.5) : 0,
        [`& + .${sectionItemClasses.formContainer}`]: {
            width: '100%'
        }
    }
}));

export const ItemFormContainer = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionItemClasses.formContainer, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    height: 50,
    display: 'flex',
    flexShrink: 0,
    placeItems: 'center',
    placeContent: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        padding: 0
    }
}));

export * from './components';
export * from './action';
export * from './link';
export * from './number_field';
export * from './radio';
export * from './select';
export * from './switch';
export * from './text_field';
