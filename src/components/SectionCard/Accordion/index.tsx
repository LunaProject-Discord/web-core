'use client';

import { Box, BoxProps, styled, switchClasses, Theme } from '@mui/material';
import { CreateSlotsAndSlotProps } from '@mui/material/utils/types';
import { BoxTypeMap } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import clsx from 'clsx';
import deepmerge from 'deepmerge';
import React, { Dispatch, ElementType, forwardRef, ReactNode, SetStateAction, useContext, useState } from 'react';
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
    sectionOutlinedNumberFieldCardClasses,
    sectionOutlinedTextFieldCardClasses,
    sectionSelectCardClasses,
    Unstable_SectionAccordionCardHeader,
    Unstable_SectionAccordionCardItems
} from '../index';
import { SectionAccordionCardHeader, SectionAccordionCardHeaderIcon } from './header';
import { SectionAccordionCardItems } from './items';

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

// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCardRoot = styled(
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
    [`&.${sectionAccordionCardClasses.readOnly}`]: {
        [`& .${sectionAccordionCardClasses.items} .${sectionCardClasses.root}`]: {
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
        }
    },
    [`&.${sectionCardClasses.variantStandard}`]: {
        [`& .${sectionAccordionCardClasses.items} .${sectionCardClasses.root}`]: {
            /**
             * [上下] パディング: 8px
             * [左右] パディング: 12px
             */
            padding: theme.spacing(1, 1.5),
            [theme.breakpoints.up('md')]: {
                /**
                 * [上] (ボーダー: 1px) + パディング: 3px
                 * [下] パディング: 4px
                 * [左] パディング: 12px + アイコン: 24px + ギャップ: 12px
                 * [右] パディング: 12px + アイコン: 24px + ギャップ: 8px
                 */
                padding: theme.spacing(.5, 5.5, .5, 6)
            }
        }
    },
    [`&.${sectionCardClasses.variantOutlined}`]: {
        border: `solid 1px ${theme.palette.divider}`,
        [`&.${sectionAccordionCardClasses.expanded} .${sectionAccordionCardClasses.header}`]: {
            [`&, & .${sectionCardClasses.root}`]: {
                borderRadius: 0,
                borderTopLeftRadius: theme.shape.borderRadius - 1,
                borderTopRightRadius: theme.shape.borderRadius - 1
            }
        },
        [`& .${sectionCardClasses.root}`]: {
            border: 'none'
        },
        [`& .${sectionAccordionCardClasses.header} .${sectionCardClasses.root}`]: {
            minHeight: theme.spacing(7.75)
        },
        [`& .${sectionAccordionCardClasses.items} .${sectionCardClasses.root}`]: {
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
                 * [左] (ボーダー: 1px) + パディング: 11px + アイコン: 24px + ギャップ: 12px
                 * [右] (ボーダー: 1px) + パディング: 11px + アイコン: 24px + ギャップ: 8px
                 */
                padding: theme.spacing(.375, 5.375, .5, 5.875)
            },
            [[
                `&.${sectionFilledNumberFieldCardClasses.root}`,
                `&.${sectionFilledTextFieldCardClasses.root}`,
                `&.${sectionOutlinedNumberFieldCardClasses.root}`,
                `&.${sectionOutlinedTextFieldCardClasses.root}`,
                `&.${sectionSelectCardClasses.root}`
            ].join(',')]: {
                [`& .${sectionCardClasses.content}`]: {
                    mt: .125
                }
            }
        }
    },
    [`& .${sectionCardClasses.root}`]: {
        width: '100%'
    },
    [`& .${sectionAccordionCardClasses.items} .${sectionCardClasses.root}`]: {
        rowGap: theme.spacing(.5)
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
    }
})) as OverridableComponent<BoxTypeMap<Pick<SectionAccordionCardRootProps, 'expanded' | 'disabled' | 'readOnly' | 'variant'>, 'div', Theme>>;

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
    headerChildren?: ReactNode;
}

export type SectionAccordionCardProps<C extends ElementType = BoxTypeMap['defaultComponent']> =
    SectionAccordionCardRootProps
    & BoxProps<C, { component?: C }>;

// tslint:disable-next-line:variable-name
export const Unstable_SectionAccordionCard = <C extends ElementType = BoxTypeMap['defaultComponent'], >(
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
            <Unstable_SectionAccordionCardRoot
                expanded={expanded}
                disabled={disabled}
                readOnly={readOnly}
                variant={variant}
                {...props}
            >
                <Unstable_SectionAccordionCardHeader>
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
                        <SectionAccordionCardHeaderIcon expanded={expanded}>
                            <ExpandMore color={!disabled ? 'action' : 'disabled'} />
                        </SectionAccordionCardHeaderIcon>
                    </SectionButtonCard>}
                </Unstable_SectionAccordionCardHeader>
                <ConfigProvider value={itemsConfig}>
                    <Unstable_SectionAccordionCardItems in={expanded} unmountOnExit>
                        {children}
                    </Unstable_SectionAccordionCardItems>
                </ConfigProvider>
            </Unstable_SectionAccordionCardRoot>
        </ConfigProvider>
    );
};

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
    return (
        <SectionAccordionCardRoot
            expanded={expanded}
            disabled={disabled}
            readOnly={readOnly}
            variant={variant}
            {...props}
        >
            <SectionAccordionCardHeader expanded={expanded} variant={variant}>
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
                    <SectionAccordionCardHeaderIcon expanded={expanded}>
                        <ExpandMore color={!disabled ? 'action' : 'disabled'} />
                    </SectionAccordionCardHeaderIcon>
                </SectionButtonCard>}
            </SectionAccordionCardHeader>
            <SectionAccordionCardItems in={expanded} readOnly={readOnly} variant={variant}>
                <ConfigProvider
                    value={
                        deepmerge<Config>(
                            config,
                            {
                                components: {
                                    SectionCard: {
                                        disabled: readOnly,
                                        variant
                                    }
                                }
                            }
                        )
                    }
                >
                    {children}
                </ConfigProvider>
            </SectionAccordionCardItems>
        </SectionAccordionCardRoot>
    );
};

export type SectionAccordionCardConfigProps = Partial<Omit<SectionAccordionCardRootProps, keyof SectionCardDisplayRootProps | 'expanded' | 'setExpanded' | 'header'>>;

export * from './header';
export * from './items';
