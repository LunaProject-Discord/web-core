'use client';

import { Box, BoxProps, Collapse, CollapseProps, styled, switchClasses } from '@mui/material';
import { BoxTypeMap } from '@mui/system';
import clsx from 'clsx';
import deepmerge from 'deepmerge';
import React, { ElementType, forwardRef, useContext, useState } from 'react';
import { Config, ConfigContext, ConfigProvider } from '../../../utils';
import {
    SectionAccordionCardProps,
    SectionAccordionCardRootProps,
    SectionButtonCard,
    sectionCardClasses,
    sectionCardDisplayClasses,
    sectionFilledNumberFieldCardClasses,
    sectionFilledTextFieldCardClasses,
    sectionLinkCardClasses,
    sectionOutlinedNumberFieldCardClasses,
    sectionOutlinedTextFieldCardClasses,
    sectionRouteLinkCardClasses,
    sectionSelectCardClasses
} from '../index';
import { sectionAccordionCardClasses } from './index';

// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCardHeader2 = styled(
    forwardRef<HTMLDivElement, BoxProps>(
        (
            {
                className,
                ...props
            },
            ref
        ) => (
            <Box
                ref={ref}
                className={clsx(sectionAccordionCardClasses.header, className)}
                {...props}
            />
        )
    )
)<BoxProps>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    [`.${sectionCardClasses.variantOutlined} &`]: {
        [`&, & .${sectionCardClasses.root}`]: {
            borderRadius: theme.shape.borderRadius - 1
        },
        [`& .${sectionCardClasses.root}`]: {
            minHeight: theme.spacing(7.75)
        },
        [`&:is(.${sectionAccordionCardClasses.expanded} *)`]: {
            [`&, & .${sectionCardClasses.root}`]: {
                borderRadius: 0,
                borderTopLeftRadius: theme.shape.borderRadius - 1,
                borderTopRightRadius: theme.shape.borderRadius - 1
            }
        },
        [`.${sectionAccordionCardClasses.expanded} &`]: {
            [`&, & .${sectionCardClasses.root}`]: {
                background: 'red'
            }
        }
    }
}));

// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCardHeaderIcon2 = styled(
    forwardRef<HTMLDivElement, BoxProps>(
        (
            {
                className,
                ...props
            },
            ref
        ) => (
            <Box
                ref={ref}
                className={clsx(sectionAccordionCardClasses.headerIcon, className)}
                {...props}
            />
        )
    )
)<BoxProps>(({ theme }) => ({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    }),
    [`.${sectionAccordionCardClasses.expanded} &`]: {
        transform: 'scale(1, -1)'
    }
}));

// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCardItems2 = styled(
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
        minHeight: theme.spacing(7),
        rowGap: theme.spacing(.5),
        [theme.breakpoints.up('md')]: {
            [[
                `&.${sectionLinkCardClasses.root}`,
                `&.${sectionRouteLinkCardClasses.root}`
            ].join(',')]: {
                [`& .${sectionCardClasses.content}:has(.${sectionCardDisplayClasses.icon}:only-child)`]: {
                    // アイコン: 24px + ギャップ: 8px
                    marginRight: theme.spacing(-4)
                }
            }
        }
    },
    [`.${sectionAccordionCardClasses.readOnly} & .${sectionCardClasses.root}`]: {
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
    [`.${sectionCardClasses.variantStandard} & .${sectionCardClasses.root}`]: {
        /**
         * [上下] パディング: 8px
         * [左右] パディング: 12px
         */
        padding: theme.spacing(1, 1.5),
        [theme.breakpoints.up('md')]: {
            /**
             * [上] (ボーダー: 1px) + パディング: 3px
             * [下] パディング: 4px
             * [左] パディング: 12px + アイコン: 24px + アイコンパディング (左右): 8px + ギャップ: 12px
             * [右] パディング: 12px + アイコン: 24px + ギャップ: 8px
             */
            padding: theme.spacing(.5, 5.5, .5, 7)
        }
    },
    [`.${sectionCardClasses.variantOutlined} & .${sectionCardClasses.root}`]: {
        /**
         * [上] (ボーダー: 1px) + パディング: 7px
         * [下] パディング: 8px
         * [左右] パディング: 11px
         */
        padding: theme.spacing(.875, 1.375, 1),
        borderTop: `solid 1px ${theme.palette.divider}`,
        borderRadius: 0,
        ['&:last-child']: {
            borderBottomLeftRadius: theme.shape.borderRadius - 1,
            borderBottomRightRadius: theme.shape.borderRadius - 1
        },
        [theme.breakpoints.up('md')]: {
            /**
             * [上] (ボーダー: 1px) + パディング: 3px
             * [下] パディング: 4px
             * [左] (ボーダー: 1px) + パディング: 11px + アイコン: 24px + アイコンパディング (左右): 8px + ギャップ: 12px
             * [右] (ボーダー: 1px) + パディング: 11px + アイコン: 24px + ギャップ: 8px
             */
            padding: theme.spacing(.375, 5.375, .5, 6.875)
        },
        [[
            `&.${sectionFilledNumberFieldCardClasses.root}`,
            `&.${sectionFilledTextFieldCardClasses.root}`,
            `&.${sectionOutlinedNumberFieldCardClasses.root}`,
            `&.${sectionOutlinedTextFieldCardClasses.root}`,
            `&.${sectionSelectCardClasses.root}`
        ].join(',')]: {
            [`& .${sectionCardClasses.content}`]: {
                marginTop: theme.spacing(.125)
            }
        }
    }
}));


// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCardRoot2 = styled(
    forwardRef<HTMLDivElement, BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'disabled' | 'readOnly' | 'variant'>>(
        (
            {
                expanded,
                disabled,
                readOnly,
                variant,
                className,
                ...props
            },
            ref
        ) => (
            <Box
                ref={ref}
                className={
                    clsx(
                        sectionCardClasses.root,
                        disabled && sectionCardClasses.disabled,
                        variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantStandard,
                        sectionAccordionCardClasses.root,
                        expanded && sectionAccordionCardClasses.expanded,
                        readOnly && sectionAccordionCardClasses.readOnly,
                        className
                    )
                }
                {...props}
            />
        )
    )
)<BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'disabled' | 'readOnly' | 'variant'>>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    [`&.${sectionCardClasses.variantOutlined}`]: {
        border: `solid 1px ${theme.palette.divider}`,
        [`& .${sectionCardClasses.root}`]: {
            border: 'none'
        }
    },
    [`& .${sectionCardClasses.root}`]: {
        width: '100%'
    }
}));

// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCard2 = <C extends ElementType = BoxTypeMap['defaultComponent'], >(
    {
        icon,
        primary,
        secondary,
        header,
        headerChildren,
        children,
        expanded: _expanded,
        setExpanded: _setExpanded,
        defaultExpanded,
        disabled: _disabled,
        readOnly: _readOnly,
        variant: _variant,
        slots,
        slotProps,
        ...props
    }: SectionAccordionCardProps<C>
) => {
    const config = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: configRootSlots,
        slotProps: configRootSlotProps
    } = config.components?.SectionCard ?? {};
    const {
        defaultExpanded: configDefaultExpanded,
        disabled: configDisabled,
        readOnly: configReadOnly,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = config.components?.SectionAccordionCard ?? {};
    const ExpandMore = config.icons.ExpandMore;

    // tslint:disable-next-line:variable-name
    const [__expanded, __setExpanded] = useState(Boolean(defaultExpanded ?? configDefaultExpanded));
    const expanded = _expanded ?? __expanded;
    const setExpanded = _setExpanded ?? __setExpanded;

    const disabled = _disabled ?? configDisabled ?? configRootDisabled;
    const readOnly = _readOnly ?? configReadOnly;
    const variant = _variant ?? configVariant ?? configRootVariant;

    const rootConfig = deepmerge<Config>(
        config,
        {
            components: {
                SectionCard: {
                    variant
                }
            }
        }
    );
    const itemsConfig = deepmerge<Config>(
        rootConfig,
        {
            components: {
                SectionCard: {
                    disabled: readOnly
                }
            }
        }
    );

    return (
        <ConfigProvider value={rootConfig}>
            <Unstable_SectionAccordionCardRoot2
                expanded={expanded}
                disabled={disabled}
                readOnly={readOnly}
                variant={variant}
                {...props}
            >
                <Unstable_SectionAccordionCardHeader2>
                    {header ? header : <SectionButtonCard
                        onClick={() => setExpanded(!expanded)}
                        disabled={disabled}
                        icon={icon}
                        primary={primary}
                        secondary={secondary}
                        variant={variant}
                        slots={slots ?? configSlots ?? configRootSlots}
                        slotProps={slotProps ?? configSlotProps ?? configRootSlotProps}
                    >
                        {headerChildren}
                        <Unstable_SectionAccordionCardHeaderIcon2>
                            <ExpandMore color={!disabled ? 'action' : 'disabled'} />
                        </Unstable_SectionAccordionCardHeaderIcon2>
                    </SectionButtonCard>}
                </Unstable_SectionAccordionCardHeader2>
                <ConfigProvider value={itemsConfig}>
                    <Unstable_SectionAccordionCardItems2 in={expanded} unmountOnExit>
                        {children}
                    </Unstable_SectionAccordionCardItems2>
                </ConfigProvider>
            </Unstable_SectionAccordionCardRoot2>
        </ConfigProvider>
    );
};
