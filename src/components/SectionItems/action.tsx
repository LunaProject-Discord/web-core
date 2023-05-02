'use client';

import { ArrowRightOutlined } from '@mui/icons-material';
import React, { MouseEvent } from 'react';
import { ButtonItemRoot, ItemFormContainer, ItemIcon, ItemProps, ItemRowContainer, ItemTextBlock } from './index';

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
        sx
    }: ActionItemProps
) => (
    <ButtonItemRoot onClick={onAction} disabled={disabled} sx={sx}>
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
