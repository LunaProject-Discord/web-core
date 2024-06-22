'use client';

import { BoxProps, Collapse, CollapseProps, styled, switchClasses } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import {
    sectionAccordionCardClasses,
    SectionAccordionCardRootProps,
    sectionCardClasses,
    sectionCardDisplayClasses
} from '../index';

// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCardItems = styled(
    forwardRef<HTMLDivElement, CollapseProps>(
        (
            {
                in: expanded,
                className,
                ...props
            },
            ref
        ) => (
            <Collapse
                ref={ref}
                in={expanded}
                className={
                    clsx(
                        sectionAccordionCardClasses.items,
                        expanded && sectionAccordionCardClasses.expanded,
                        className
                    )
                }
                {...props}
            />
        )
    )
)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [`& .${sectionCardClasses.root}`]: {
        width: '100%',
        minHeight: theme.spacing(7)
    }
}));

export const SectionAccordionCardItems = styled(
    (
        {
            in: expanded,
            readOnly,
            variant,
            className,
            ...props
        }: CollapseProps & Pick<SectionAccordionCardRootProps, 'readOnly' | 'variant'>
    ) => (
        <Collapse
            in={expanded}
            className={
                clsx(
                    sectionAccordionCardClasses.items,
                    expanded && sectionAccordionCardClasses.expanded,
                    readOnly && sectionAccordionCardClasses.readOnly,
                    variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantStandard,
                    className
                )
            }
            {...props}
        />
    )
)<CollapseProps & Pick<SectionAccordionCardRootProps, 'readOnly' | 'variant'>>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    [`& .${sectionCardClasses.root}`]: {
        width: '100%',
        minHeight: theme.spacing(7)
    },
    [`&.${sectionAccordionCardClasses.readOnly} .${sectionCardClasses.root}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        color: theme.palette.action.disabled,
        [[
            `& .${sectionCardDisplayClasses.root} *`,
            `& .${sectionCardDisplayClasses.icon} *`,
            `& .${sectionCardDisplayClasses.primary} *`,
            `& .${sectionCardDisplayClasses.secondary} *`,
            `& .${sectionCardClasses.content} *:not(.${switchClasses.root} *)`
        ].join(',')]: {
            color: theme.palette.action.disabled
        }
    },
    [`&.${sectionCardClasses.variantStandard} .${sectionCardClasses.root}`]: {
        padding: theme.spacing(.5, 1.5),
        paddingLeft: theme.spacing(7)
    },
    [`&.${sectionCardClasses.variantOutlined} .${sectionCardClasses.root}`]: {
        padding: theme.spacing(.375, 1.375, .5, 6.875),
        borderTop: `solid 1px ${theme.palette.divider} !important`,
        borderRadius: 0,
        ['&:last-child']: {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius
        }
    }
}));
