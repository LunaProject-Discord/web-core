'use client';

import { ArrowRightOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { HTMLAttributeAnchorTarget } from 'react';
import {
    ButtonItemRoot,
    ItemDisabledProps,
    ItemFormContainer,
    ItemIcon,
    ItemIconProps,
    ItemRowContainer,
    ItemTextBlock,
    ItemTextBlockProps
} from './index';

interface Props {
    href: string;
}

export interface LinkItemProps extends ItemTextBlockProps, ItemIconProps, ItemDisabledProps, Props {
    target?: HTMLAttributeAnchorTarget;
}

export const LinkItem = ({ icon, primary, secondary, href, target, disabled }: LinkItemProps) => (
    <ButtonItemRoot
        onClick={() => target ? window.open(href, target) : window.location.href = href}
        disabled={disabled}
    >
        <ItemRowContainer>
            <ItemIcon icon={icon} />
            <ItemTextBlock primary={primary} secondary={secondary} disabled={disabled} />
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

export interface RouteLinkItemProps extends ItemTextBlockProps, ItemIconProps, ItemDisabledProps, Props {
    replace?: boolean;
}

export const RouteLinkItem = ({ icon, primary, secondary, href, replace, disabled }: RouteLinkItemProps) => {
    const router = useRouter();

    return (
        <ButtonItemRoot onClick={() => replace ? router.replace(href) : router.push(href)} disabled={disabled}>
            <ItemRowContainer>
                <ItemIcon icon={icon} />
                <ItemTextBlock primary={primary} secondary={secondary} disabled={disabled} />
                <ItemFormContainer>
                    <ItemIcon icon={<ArrowRightOutlined color={!disabled ? 'action' : 'disabled'} />} />
                </ItemFormContainer>
            </ItemRowContainer>
        </ButtonItemRoot>
    );
};
