import { BoxProps } from '@mui/material';
import { SelectOutlinedInput } from './outlined';

export interface SelectInputRootProps {
    open: boolean;
    disabled: boolean;
}

export type SelectInputProps = Partial<SelectInputRootProps> & BoxProps;

export const SelectInput = SelectOutlinedInput;

export * from './outlined';
