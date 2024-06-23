'use client';

import { SlotComponentProps } from '@mui/base';
import { Box, BoxProps, Collapse, CollapseProps, styled, switchClasses } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { CreateSlotsAndSlotProps } from '@mui/material/utils/types';
import { BoxTypeMap } from '@mui/system';
import clsx from 'clsx';
import deepmerge from 'deepmerge';
import React, { Dispatch, ElementType, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Config, ConfigContext, ConfigProvider, generateComponentClasses } from '../../../utils';
import {
    SectionButtonCard,
    sectionCardClasses,
    SectionCardDisabledProps,
    sectionCardDisplayClasses,
    SectionCardDisplayRootProps,
    SectionCardDisplaySlotsAndSlotProps,
    SectionCardVariantProps,
    sectionFilledNumberFieldCardClasses,
    sectionFilledTextFieldCardClasses,
    sectionLinkCardClasses,
    sectionOutlinedNumberFieldCardClasses,
    sectionOutlinedTextFieldCardClasses,
    sectionRouteLinkCardClasses,
    sectionSelectCardClasses,
    SlotRootProps
} from '../index';

export const sectionAccordionCardClasses = generateComponentClasses(
    'SectionAccordionCard',
    [
        'root',
        'header',
        'headerIcon',
        'items',

        'expanded',
        'readOnly'
    ]
);

export const SectionAccordionCardHeader = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionAccordionCardClasses.header, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    [`.${sectionAccordionCardClasses.expanded}.${sectionCardClasses.variantOutlined} &`]: {
        [`&, & .${sectionCardClasses.root}`]: {
            borderRadius: 0,
            borderTopLeftRadius: theme.shape.borderRadius - 1,
            borderTopRightRadius: theme.shape.borderRadius - 1
        }
    },
    [`.${sectionCardClasses.variantOutlined} &`]: {
        [`&, & .${sectionCardClasses.root}`]: {
            borderRadius: theme.shape.borderRadius - 1
        },
        [`& .${sectionCardClasses.root}`]: {
            minHeight: theme.spacing(7.75)
        }
    }
}));

export const SectionAccordionCardHeaderIcon = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionAccordionCardClasses.headerIcon, className)}
            {...props}
        />
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

export const SectionAccordionCardItems = styled(
    ({ in: expanded, className, ...props }: CollapseProps) => (
        <Collapse
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
)<CollapseProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [`& .${sectionCardClasses.root}:not(#_)`]: {
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
    [`.${sectionAccordionCardClasses.readOnly} & .${sectionCardClasses.root}:not(#_)`]: {
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
    [`.${sectionCardClasses.variantStandard} & .${sectionCardClasses.root}:not(#_)`]: {
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
    [`.${sectionCardClasses.variantOutlined} & .${sectionCardClasses.root}:not(#_)`]: {
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

export const SectionAccordionCardRoot = styled(
    (
        {
            expanded,
            disabled,
            readOnly,
            variant,
            className,
            ...props
        }: BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'disabled' | 'readOnly' | 'variant'>
    ) => (
        <Box
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

export type SectionAccordionCardSlotsAndSlotProps = CreateSlotsAndSlotProps<{
    display?: SectionCardDisplaySlotsAndSlotProps['slots'];
    header?: ElementType;
    headerIcon?: ElementType;
    items?: ElementType<TransitionProps>;
}, {
    display: SectionCardDisplaySlotsAndSlotProps['slotProps'];
    header: SlotComponentProps<typeof Box, SlotRootProps, {}>;
    headerIcon: SlotComponentProps<typeof Box, SlotRootProps, {}>;
    items: SlotComponentProps<typeof Collapse, SlotRootProps, {}>;
}>;

export interface SectionAccordionCardRootProps extends SectionCardDisplayRootProps, SectionCardDisabledProps, SectionCardVariantProps, SectionAccordionCardSlotsAndSlotProps {
    expanded?: boolean;
    setExpanded?: Dispatch<SetStateAction<boolean>>;
    defaultExpanded?: boolean;
    readOnly?: boolean;
    header?: ReactNode;
    headerChildren?: ReactNode;
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
            <SectionAccordionCardRoot
                expanded={expanded}
                disabled={disabled}
                readOnly={readOnly}
                variant={variant}
                {...props}
            >
                <SectionAccordionCardHeader
                    component={slots?.header ?? configSlots?.header}
                    {...(slotProps?.header ?? configSlotProps?.header)}
                >
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
                        <SectionAccordionCardHeaderIcon
                            component={slots?.headerIcon ?? configSlots?.headerIcon}
                            {...(slotProps?.headerIcon ?? configSlotProps?.headerIcon)}
                        >
                            <ExpandMore color={!disabled ? 'action' : 'disabled'} />
                        </SectionAccordionCardHeaderIcon>
                    </SectionButtonCard>}
                </SectionAccordionCardHeader>
                <ConfigProvider value={itemsConfig}>
                    <SectionAccordionCardItems
                        in={expanded}
                        component={slots?.items ?? configSlots?.items}
                        {...(slotProps?.items ?? configSlotProps?.items)}
                    >
                        {children}
                    </SectionAccordionCardItems>
                </ConfigProvider>
            </SectionAccordionCardRoot>
        </ConfigProvider>
    );
};

export type SectionAccordionCardConfigProps = Partial<Omit<SectionAccordionCardRootProps, keyof SectionCardDisplayRootProps | 'header' | 'headerChildren' | 'expanded' | 'setExpanded'>>;
