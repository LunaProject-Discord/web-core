import {
    FilledInput as MuiFilledInput,
    FilledInputProps,
    InputAdornment,
    inputBaseClasses,
    styled
} from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { ConfigContext } from '../../utils';
import { numberFieldClasses, NumberFieldRootProps, SpinButton } from './index';
import { useNumberField } from './utils';

const FilledInput = styled(
    ({ disabled, className, ...props }: FilledInputProps) => (
        <MuiFilledInput
            disabled={disabled}
            className={
                clsx(
                    numberFieldClasses.root,
                    disabled && numberFieldClasses.disabled,
                    numberFieldClasses.variantFilled,
                    className
                )
            }
            {...props}
        />
    )
)<FilledInputProps>(({ theme }) => ({
    padding: 0,
    [`& .${inputBaseClasses.input}`]: {
        padding: theme.spacing(1, 1.5, 1.125)
    }
}));

export type FilledNumberFieldProps = Omit<FilledInputProps, 'value'> & NumberFieldRootProps;

export const FilledNumberField = forwardRef<HTMLInputElement, FilledNumberFieldProps>((_props, ref) => {
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
        onIncrementButtonClick,
        onDecrementButtonClick,

        props
    } = useNumberField(_props);

    const { icons: { Decrement, Increment } } = useContext(ConfigContext);

    return (
        <FilledInput
            value={input}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
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
                    >
                        <Decrement />
                    </SpinButton>
                </InputAdornment>
            }
            {...props}
        />
    );
});
