import { InputBaseProps, InternalStandardProps } from '@mui/material';
import { ChangeEventHandler, MouseEventHandler, useCallback } from 'react';
import { NumberFieldRootProps } from './index';

export interface NumberFieldHookProps<T extends InternalStandardProps<InputBaseProps>> extends Omit<NumberFieldRootProps, 'step' | 'shiftMultiplier'> {
    step: number;
    shiftMultiplier: number;
    pattern: string;

    onChange: ChangeEventHandler<HTMLInputElement>;
    onIncrementButtonClick: MouseEventHandler<HTMLButtonElement>;
    onDecrementButtonClick: MouseEventHandler<HTMLButtonElement>;

    props: T;
}

export const useNumberField = <T extends InternalStandardProps<InputBaseProps>, >(
    {
        value,
        setValue: _setValue,
        disabled,
        min,
        max,
        step: _step,
        shiftMultiplier: _shiftMultiplier,
        ...props
    }: T & NumberFieldRootProps
): NumberFieldHookProps<T> => {
    const step = _step ?? 1;
    const shiftMultiplier = _shiftMultiplier ?? 10;
    const pattern = Number.isInteger(step) ? '[0-9]*' : '[0-9,.]*';
    const regex = new RegExp(`^${pattern}$`);

    const mathMinMax = useCallback((value: number) => {
        let n = value;
        if (min)
            n = Math.max(n, min);
        if (max)
            n = Math.min(n, max);
        return n;
    }, [min, max]);

    const setValue = useCallback(_setValue, [_setValue]);

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value;
        if (!regex.test(value))
            return;

        const i = Number(value);
        setValue(mathMinMax(i));
    }, [mathMinMax, setValue, regex]);

    const onIncrementButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        setValue(mathMinMax(value + (e.shiftKey ? step * shiftMultiplier : step)));
    }, [mathMinMax, setValue, value, step, shiftMultiplier]);

    const onDecrementButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        setValue(mathMinMax(value - (e.shiftKey ? step * shiftMultiplier : step)));
    }, [mathMinMax, setValue, value, step, shiftMultiplier]);

    return {
        value,
        setValue,
        disabled,
        min,
        max,
        step,
        shiftMultiplier,
        pattern,

        onChange,
        onIncrementButtonClick,
        onDecrementButtonClick,

        props: props as unknown as T
    };
};
