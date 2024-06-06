import {
    InputAdornment,
    inputBaseClasses,
    OutlinedInput as MuiOutlinedInput,
    OutlinedInputProps,
    styled
} from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { ConfigContext } from '../../utils';
import { numberFieldClasses, NumberFieldRootProps, SpinButton } from './index';
import { useNumberField } from './utils';

const OutlinedInput = styled(
    ({ disabled, className, ...props }: OutlinedInputProps) => (
        <MuiOutlinedInput
            disabled={disabled}
            className={
                clsx(
                    numberFieldClasses.root,
                    disabled && numberFieldClasses.disabled,
                    numberFieldClasses.variantOutlined,
                    className
                )
            }
            {...props}
        />
    )
)<OutlinedInputProps>(({ theme }) => ({
    padding: 0,
    [`& .${inputBaseClasses.input}`]: {
        padding: theme.spacing(1.0625, 1.75)
    }
}));

export type OutlinedNumberFieldProps = Omit<OutlinedInputProps, 'value'> & NumberFieldRootProps;

export const OutlinedNumberField = forwardRef<HTMLInputElement, OutlinedNumberFieldProps>((_props, ref) => {
    const {
        input,
        value,

        disabled,
        min,
        max,
        step,
        inputMode,
        pattern,

        onInputChange,
        onInputKeyDown,
        onInputFocus,
        onInputBlur,
        onIncrementButtonClick,
        onDecrementButtonClick,

        props
    } = useNumberField(_props);

    const { icons: { Decrement, Increment } } = useContext(ConfigContext);

    return (
        <OutlinedInput
            value={input}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            disabled={disabled}
            inputRef={ref}
            inputProps={{
                inputMode,
                pattern,
                min,
                max,
                step
            }}
            size="small"
            margin="none"
            endAdornment={
                <InputAdornment
                    position="end"
                    sx={{
                        height: '100%',
                        maxHeight: 'unset',
                        m: 0,
                        display: 'grid',
                        gridTemplateRows: '1fr 1fr',
                        cursor: 'default'
                    }}
                >
                    <SpinButton
                        onClick={onIncrementButtonClick}
                        disabled={disabled || value === max}
                        tabIndex={-1}
                        className={
                            clsx(
                                numberFieldClasses.spinButton,
                                numberFieldClasses.spinButtonIncrement,
                                (disabled || value === max) && numberFieldClasses.disabled
                            )
                        }
                        sx={{ borderTopRightRadius: (theme) => theme.shape.borderRadius }}
                    >
                        <Increment />
                    </SpinButton>
                    <SpinButton
                        onClick={onDecrementButtonClick}
                        disabled={disabled || value === min}
                        tabIndex={-1}
                        className={
                            clsx(
                                numberFieldClasses.spinButton,
                                numberFieldClasses.spinButtonDecrement,
                                (disabled || value === min) && numberFieldClasses.disabled
                            )
                        }
                        sx={{ borderBottomRightRadius: (theme) => theme.shape.borderRadius }}
                    >
                        <Decrement />
                    </SpinButton>
                </InputAdornment>
            }
            {...props}
        />
    );
});
