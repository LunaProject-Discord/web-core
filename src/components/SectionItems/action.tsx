'use client';

import { ArrowRightOutlined } from '@mui/icons-material';
import React, { MouseEvent } from 'react';
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

export interface ActionItemProps extends ItemTextBlockProps, ItemIconProps, ItemDisabledProps {
    onAction: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const ActionItem = ({ icon, primary, secondary, onAction, disabled }: ActionItemProps) => (
    <ButtonItemRoot onClick={onAction} disabled={disabled}>
        <ItemRowContainer>
            <ItemIcon icon={icon} />
            <ItemTextBlock primary={primary} secondary={secondary} disabled={disabled} />
            <ItemFormContainer>
                <ItemIcon icon={<ArrowRightOutlined color={!disabled ? 'action' : 'disabled'} />} />
            </ItemFormContainer>
        </ItemRowContainer>
    </ButtonItemRoot>
);
