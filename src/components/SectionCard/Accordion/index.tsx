'use client';

import { Box, BoxProps, Collapse, CollapseProps, styled, Theme } from '@mui/material';
import { CreateSlotsAndSlotProps } from '@mui/material/utils/types';
import { BoxTypeMap } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import clsx from 'clsx';
import React, { Dispatch, ElementType, ReactNode, SetStateAction, useContext, useState } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionButtonCard,
    sectionCardClasses,
    SectionCardDisabledProps,
    SectionCardDisplayRootProps,
    SectionCardDisplaySlotsAndSlotProps,
    SectionCardVariantProps
} from '../index';

export const sectionAccordionCardClasses = {
    root: 'SectionAccordionCard-root',
    header: 'SectionAccordionCard-header',
    headerIcon: 'SectionAccordionCard-headerIcon',
    items: 'SectionAccordionCard-items',

    expanded: 'SectionAccordionCard-expanded',
    readOnly: 'SectionAccordionCard-readOnly'
};

export const SectionAccordionCardRoot = styled(
    (
        {
            expanded,
            readOnly,
            variant,
            className,
            ...props
        }: BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>
    ) => (
        <Box
            className={
                clsx(
                    sectionAccordionCardClasses.root,
                    expanded && sectionAccordionCardClasses.expanded,
                    readOnly && sectionAccordionCardClasses.readOnly,
                    variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantDefault,
                    className
                )
            }
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' }
)<BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    [`&.${sectionCardClasses.variantOutlined}`]: {
        border: `solid 1px ${theme.palette.divider}`,
        [`& .${sectionCardClasses.root}`]: {
            border: 'none'
        }
    }
})) as OverridableComponent<BoxTypeMap<Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>, 'div', Theme>>;

export const SectionAccordionCardHeader = styled(
    (
        {
            expanded,
            className,
            ...props
        }: BoxProps & Pick<SectionAccordionCardRootProps, 'expanded'>
    ) => (
        <Box
            className={
                clsx(
                    sectionAccordionCardClasses.header,
                    expanded && sectionAccordionCardClasses.expanded,
                    className
                )
            }
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' }
)<BoxProps & Pick<SectionAccordionCardRootProps, 'expanded'>>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    [`& .${sectionCardClasses.root}`]: {
        width: '100%'
    },
    [`&.${sectionAccordionCardClasses.expanded}, &.${sectionAccordionCardClasses.expanded} .${sectionCardClasses.root}`]: {
        borderRadius: 0,
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius
    }
}));

export const SectionAccordionCardHeaderIcon = styled(
    (
        {
            expanded,
            className,
            ...props
        }: BoxProps & Pick<SectionAccordionCardRootProps, 'expanded'>
    ) => (
        <Box
            className={
                clsx(
                    sectionAccordionCardClasses.headerIcon,
                    expanded && sectionAccordionCardClasses.expanded,
                    className
                )
            }
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' }
)<BoxProps & Pick<SectionAccordionCardRootProps, 'expanded'>>(({ theme }) => ({
    transform: 'rotate(90deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    }),
    [`&.${sectionAccordionCardClasses.expanded}`]: {
        transform: 'rotate(0deg)'
    }
}));

export const SectionAccordionCardItems = styled(
    (
        {
            expanded,
            readOnly,
            variant,
            className,
            ...props
        }: CollapseProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>
    ) => (
        <Collapse
            className={
                clsx(
                    sectionAccordionCardClasses.items,
                    expanded && sectionAccordionCardClasses.expanded,
                    readOnly && sectionAccordionCardClasses.readOnly,
                    variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantDefault,
                    className
                )
            }
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' }
)<CollapseProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    [`&. .${sectionCardClasses.root}`]: {
        minHeight: theme.spacing(7),
        borderRadius: 0,
        ['&:last-child']: {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius
        }
    },
    [`&.${sectionCardClasses.variantDefault} .${sectionCardClasses.root}`]: {
        padding: theme.spacing(.5, 1.5)
    },
    [`&.${sectionCardClasses.variantOutlined} .${sectionCardClasses.root}`]: {
        padding: theme.spacing(.375, 1.375),
        ['&:not(:last-child)']: {
            borderBottom: `solid 1px ${theme.palette.divider}`
        }
    }
}));

export type SectionAccordionCardSlotsAndSlotProps = CreateSlotsAndSlotProps<{
    display?: SectionCardDisplaySlotsAndSlotProps['slots'];
}, {
    display: SectionCardDisplaySlotsAndSlotProps['slotProps'];
}>;

export interface SectionAccordionCardRootProps extends SectionCardDisplayRootProps, SectionCardDisabledProps, SectionCardVariantProps, SectionAccordionCardSlotsAndSlotProps {
    expanded?: boolean;
    setExpanded?: Dispatch<SetStateAction<boolean>>;
    defaultExpanded?: boolean;
    readOnly?: boolean;
    header?: ReactNode;
}

export type SectionAccordionCardProps<C extends ElementType = BoxTypeMap['defaultComponent']> =
    SectionAccordionCardRootProps
    & BoxProps<C, { component?: C }>;

export const SectionAccordionCard = <C extends ElementType = BoxTypeMap['defaultComponent'], >(
    {
        icon,
        primary,
        secondary,
        header,
        children,
        // tslint:disable-next-line:variable-name
        expanded: __expanded,
        // tslint:disable-next-line:variable-name
        setExpanded: __setExpanded,
        defaultExpanded,
        disabled,
        readOnly,
        variant,
        slots,
        slotProps,
        ...props
    }: SectionAccordionCardProps<C>
) => {
    const [_expanded, _setExpanded] = useState(Boolean(defaultExpanded));
    const expanded = __expanded ?? _expanded;
    const setExpanded = __setExpanded ?? _setExpanded;

    const { icons: { ExpandMore } } = useContext(ConfigContext);

    return (
        <SectionAccordionCardRoot expanded={expanded} readOnly={readOnly} variant={variant} {...props}>
            <SectionAccordionCardHeader expanded={expanded}>
                {header ? header : <SectionButtonCard
                    onClick={() => setExpanded(!expanded)}
                    disabled={disabled}
                    icon={icon}
                    primary={primary}
                    secondary={secondary}
                    slots={slots}
                    slotProps={slotProps}
                >
                    <SectionAccordionCardHeaderIcon expanded={expanded}>
                        <ExpandMore color={!disabled ? 'action' : 'disabled'} />
                    </SectionAccordionCardHeaderIcon>
                </SectionButtonCard>}
            </SectionAccordionCardHeader>
            <SectionAccordionCardItems in={expanded} expanded={expanded} readOnly={readOnly} variant={variant}>
                {children}
            </SectionAccordionCardItems>
        </SectionAccordionCardRoot>
    );
};
