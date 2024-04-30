import { CreateSlotsAndSlotProps, SlotProps } from '@mui/material/utils/types';
import { ElementType } from 'react';

export const getSectionControlCardClasses = (name: string) => ({
    root: `Section${name}Card-root`,
    control: `Section${name}Card-control`
});

export type SectionControlCardSlotsAndSlotProps<Component extends ElementType, Overrides = {}, OwnerState = {}> = CreateSlotsAndSlotProps<{
    control?: ElementType;
}, {
    control: SlotProps<Component, Overrides, OwnerState>;
}>;
