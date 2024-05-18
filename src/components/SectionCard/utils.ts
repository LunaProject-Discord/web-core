import { SlotComponentProps } from '@mui/base';
import { Theme } from '@mui/material';
import { CreateSlotsAndSlotProps } from '@mui/material/utils/types';
import { SxProps } from '@mui/system';
import { ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const generateSectionControlCardClasses = (name: string) => generateComponentClasses(`Section${name}Card`, ['root', 'control']);

export interface SlotRootProps {
    component?: ElementType;
    sx?: SxProps<Theme>;
}

export type SectionControlCardSlotProps<Component extends ElementType, Overrides = {}, OwnerState = {}> = {
    slotProps?: {
        control?: SlotComponentProps<Component, SlotRootProps & Overrides, OwnerState>;
    };
};

export type SectionControlCardSlotsAndSlotProps<Component extends ElementType, Overrides = {}, OwnerState = {}> = CreateSlotsAndSlotProps<{
    control?: ElementType;
}, {
    control: SlotComponentProps<Component, SlotRootProps & Overrides, OwnerState>;
}>;
