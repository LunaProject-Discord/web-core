'use client';

import { ArrowRightOutlined, OpenInNewOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { HTMLAttributeAnchorTarget } from 'react';
import { ButtonItemRoot, ItemFormContainer, ItemIcon, ItemProps, ItemRowContainer, ItemTextBlock } from './index';

export const linkItemClasses = {
    root: 'LinkItem-root'
};

interface Props {
    href: string;
}

export interface LinkItemProps extends ItemProps, Props {
    target?: HTMLAttributeAnchorTarget;
}

export const LinkItem = (
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        href,
        target,
        disabled,
        className,
        sx
    }: LinkItemProps
) => (
    <ButtonItemRoot
        onClick={() => target ? window.open(href, target) : window.location.href = href}
        disabled={disabled}
        className={clsx(linkItemClasses.root, className)}
        sx={sx}
    >
        <ItemRowContainer>
            <ItemIcon icon={icon} iconSx={iconSx} />
            <ItemTextBlock
                primary={primary}
                secondary={secondary}
                primaryTypographyProps={primaryTypographyProps}
                secondaryTypographyProps={secondaryTypographyProps}
                disabled={disabled}
            />
            <ItemFormContainer>
                <ItemIcon
                    icon={
                        target === '_blank' ?
                            <OpenInNewOutlined color={!disabled ? 'action' : 'disabled'} />
                            :
                            <ArrowRightOutlined color={!disabled ? 'action' : 'disabled'} />
                    }
                />
            </ItemFormContainer>
        </ItemRowContainer>
    </ButtonItemRoot>
);

export const routeLinkItemClasses = {
    root: 'RouteLinkItem-root'
};

export interface RouteLinkItemProps extends ItemProps, Props {
    replace?: boolean;
}

export const RouteLinkItem = (
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        href,
        replace,
        disabled,
        className,
        sx
    }: RouteLinkItemProps
) => {
    const router = useRouter();

    return (
        <ButtonItemRoot
            onClick={() => replace ? router.replace(href) : router.push(href)}
            disabled={disabled}
            className={clsx(routeLinkItemClasses.root, className)}
            sx={sx}
        >
            <ItemRowContainer>
                <ItemIcon icon={icon} iconSx={iconSx} />
                <ItemTextBlock
                    primary={primary}
                    secondary={secondary}
                    primaryTypographyProps={primaryTypographyProps}
                    secondaryTypographyProps={secondaryTypographyProps}
                    disabled={disabled}
                />
                <ItemFormContainer>
                    <ItemIcon icon={<ArrowRightOutlined color={!disabled ? 'action' : 'disabled'} />} />
                </ItemFormContainer>
            </ItemRowContainer>
        </ButtonItemRoot>
    );
};
