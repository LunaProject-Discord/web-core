'use client';

import { ArrowRightOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { ButtonItemRoot, ItemFormContainer, ItemIcon, ItemProps, ItemRowContainer, ItemTextBlock } from './index';

export const actionItemClasses = {
    root: 'ActionItem-root'
};

export interface ActionItemProps extends ItemProps {
    onAction: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const ActionItem = (
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        onAction,
        disabled,
        className,
        sx
    }: ActionItemProps
) => (
    <ButtonItemRoot
        onClick={onAction}
        disabled={disabled}
        className={clsx(actionItemClasses.root, className)}
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
