'use client';

import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { sectionAccordionCardClasses, SectionAccordionCardRootProps, sectionCardClasses } from '../index';

export const SectionAccordionCardHeader = styled(
    (
        {
            expanded,
            variant,
            className,
            ...props
        }: BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'variant'>
    ) => (
        <Box
            className={
                clsx(
                    sectionAccordionCardClasses.header,
                    expanded && sectionAccordionCardClasses.expanded,
                    variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantStandard,
                    className
                )
            }
            {...props}
        />
    )
)<BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'variant'>>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    [`& .${sectionCardClasses.root}`]: {
        width: '100%'
    },
    [`&.${sectionCardClasses.variantOutlined}`]: {
        [`&.${sectionAccordionCardClasses.expanded}, &.${sectionAccordionCardClasses.expanded} .${sectionCardClasses.root}`]: {
            borderRadius: 0,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius
        },
        [`& .${sectionCardClasses.root}`]: {
            minHeight: theme.spacing(7.75)
        }
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
    )
)<BoxProps & Pick<SectionAccordionCardRootProps, 'expanded'>>(({ theme }) => ({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    }),
    [`&.${sectionAccordionCardClasses.expanded}`]: {
        transform: 'scale(1, -1)'
    }
}));
