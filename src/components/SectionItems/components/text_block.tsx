import { Box, BoxProps, styled, TypeText, Typography, TypographyProps } from '@mui/material';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { ItemDisabledProps } from '../index';

export const sectionItemTextBlockClasses = {
    root: 'SectionItemTextBlock-root',
    primary: 'SectionItemTextBlock-primary',
    secondary: 'SectionItemTextBlock-secondary'
};

export const ItemTextBlockRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionItemTextBlockClasses.root, className)}
            {...props}
        />
    )
)<BoxProps>({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden'
});

export type ItemTextBlockTypographyRootProps = Omit<TypographyProps, 'variant'>;

export type ItemTextBlockTypographyVariant = keyof Omit<TypeText, 'disabled'>;

export interface ItemTextBlockTypographyProps extends ItemTextBlockTypographyRootProps, ItemDisabledProps {
    variant: ItemTextBlockTypographyVariant;
}

export const ItemTextBlockTypography = styled(
    ({ variant, className, ...props }: ItemTextBlockTypographyProps) => (
        <Typography
            variant={variant === 'primary' ? 'body1' : 'body2'}
            className={clsx(sectionItemTextBlockClasses[variant], className)}
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'disabled' }
)<ItemTextBlockTypographyProps>(({ theme, variant, disabled }) => ({
    width: '100%',
    textAlign: 'start',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: !disabled ? theme.palette.text[variant] : theme.palette.text.disabled,
    [theme.breakpoints.down('md')]: {
        overflow: 'auto',
        whiteSpace: 'normal'
    }
}));

export interface ItemTextBlockProps {
    primary?: ReactNode;
    secondary?: ReactNode;
    primaryTypographyProps?: ItemTextBlockTypographyRootProps;
    secondaryTypographyProps?: ItemTextBlockTypographyRootProps;
}

export const ItemTextBlock = (
    {
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        disabled = false
    }: ItemTextBlockProps & ItemDisabledProps
) => (
    <ItemTextBlockRoot>
        <ItemTextBlockTypography variant="primary" disabled={disabled} {...primaryTypographyProps}>
            {primary}
        </ItemTextBlockTypography>
        {secondary && <ItemTextBlockTypography variant="secondary" disabled={disabled} {...secondaryTypographyProps}>
            {secondary}
        </ItemTextBlockTypography>}
    </ItemTextBlockRoot>
);
