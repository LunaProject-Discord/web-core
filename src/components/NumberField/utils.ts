import { InputBaseProps, InternalStandardProps } from '@mui/material';
import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { NumberFieldRootProps } from './index';

export interface NumberFieldHookProps<T extends InternalStandardProps<InputBaseProps>> extends Omit<NumberFieldRootProps, 'setValue' | 'step' | 'shiftMultiplier'> {
    input: string;

    step: number;
    shiftMultiplier: number;
    inputMode: 'numeric' | 'decimal';
    pattern: string;

    onInputChange: ChangeEventHandler<HTMLInputElement>;
    onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
    onIncrementButtonClick: MouseEventHandler<HTMLButtonElement>;
    onDecrementButtonClick: MouseEventHandler<HTMLButtonElement>;

    props: T;
}

export const useNumberField = <T extends InternalStandardProps<InputBaseProps>>(
    {
        value,
        setValue: _setValue,
        disabled,
        disabledArrowKeys,
        min,
        max,
        step: _step,
        shiftMultiplier: _shiftMultiplier,
        ...props
    }: T & NumberFieldRootProps
): NumberFieldHookProps<T> => {
    const step = _step ?? 1;
    const shiftMultiplier = _shiftMultiplier ?? 10;

    const [input, setInput] = useState(value.toString());

    const [pattern, regex] = useMemo(() => {
        let p = '^';
        if (min === undefined || min < 0)
            p += '-?';
        p += '[\\d';
        if (!Number.isInteger(step))
            p += '.';
        p += ']*$';
        return [p, new RegExp(p)];
    }, [min, step]);

    const mathMinMax = useCallback((value: number) => {
        let n = value;
        if (min !== undefined)
            n = Math.max(n, min);
        if (max !== undefined)
            n = Math.min(n, max);
        return n;
    }, [min, max]);

    const setValue = useCallback((_value: string | number) => {
        const value = typeof _value === 'string' ? Number(_value) : _value;
        if (!Number.isNaN(value))
            _setValue(mathMinMax(value));
    }, [_setValue]);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value;
        if (!regex.test(value))
            return;

        setInput(value);
        setValue(value);
    }, [mathMinMax, setValue, regex]);

    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        const key = e.key;
        const isShift = e.shiftKey;

        switch (key) {
            case 'ArrowUp':
                e.preventDefault();

                if (!disabledArrowKeys)
                    setValue(value + (isShift ? step * shiftMultiplier : step));
                return;
            case 'ArrowDown':
                e.preventDefault();

                if (!disabledArrowKeys)
                    setValue(value - (isShift ? step * shiftMultiplier : step));
                return;
            default:
                return;
        }
    }, [mathMinMax, setValue, value, step, shiftMultiplier, disabledArrowKeys]);

    const onIncrementButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const isShift = e.shiftKey;
        setValue(mathMinMax(value + (isShift ? step * shiftMultiplier : step)));
    }, [mathMinMax, setValue, value, step, shiftMultiplier]);

    const onDecrementButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const isShift = e.shiftKey;
        setValue(mathMinMax(value - (isShift ? step * shiftMultiplier : step)));
    }, [mathMinMax, setValue, value, step, shiftMultiplier]);

    return {
        input,
        value,

        disabled,
        disabledArrowKeys,
        min,
        max,
        step,
        shiftMultiplier,
        inputMode: Number.isInteger(step) ? 'numeric' : 'decimal',
        pattern,

        onInputChange,
        onInputKeyDown,
        onIncrementButtonClick,
        onDecrementButtonClick,

        props: props as unknown as T
    };
};
