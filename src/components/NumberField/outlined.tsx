import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../utils';
import { numberFieldClasses, NumberFieldRootProps, SpinButton } from './index';
import { useNumberField } from './utils';

export type OutlinedNumberFieldProps = Omit<OutlinedInputProps, 'value'> & NumberFieldRootProps;

export const OutlinedNumberField = (props: OutlinedNumberFieldProps) => {
    const { className } = props;

    const {
        value,
        disabled,
        min,
        max,
        step,
        pattern,
        onChange,
        onIncrementButtonClick,
        onDecrementButtonClick
    } = useNumberField(props);

    const { icons: { Decrement, Increment } } = useContext(ConfigContext);

    return (
        <OutlinedInput
            value={value}
            onChange={onChange}
            disabled={disabled}
            inputProps={{
                inputMode: 'numeric',
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
            className={
                clsx(
                    numberFieldClasses.root,
                    disabled && numberFieldClasses.disabled,
                    numberFieldClasses.variantOutlined,
                    className
                )
            }
        />
    );
};
