import { InputBaseProps, InternalStandardProps } from '@mui/material';
import {
    ChangeEventHandler,
    FocusEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { NumberFieldRootProps } from './index';

export interface NumberFieldHookProps<T extends InternalStandardProps<InputBaseProps>> extends Omit<NumberFieldRootProps, 'setValue' | 'step' | 'shiftMultiplier'> {
    input: string;

    step: number;
    shiftMultiplier: number;
    inputMode: 'numeric' | 'decimal';
    pattern: string;

    onInputChange: ChangeEventHandler<HTMLInputElement>;
    onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
    onInputFocus: FocusEventHandler<HTMLInputElement>;
    onInputBlur: FocusEventHandler<HTMLInputElement>;
    onIncrementButtonClick: MouseEventHandler<HTMLButtonElement>;
    onDecrementButtonClick: MouseEventHandler<HTMLButtonElement>;

    props: Omit<T, 'value'>;
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
    const [focused, setFocused] = useState(false);

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

    const setValue = useCallback((value: string | number) => {
        const n = typeof value === 'string' ? Number(value) : value;
        if (Number.isNaN(n) || typeof value === 'string' && value.length < 1) {
            setInput(value.toString());
            if (typeof value === 'string' && value.length < 1)
                _setValue(0);
            return;
        }

        const v = mathMinMax(n);
        _setValue(v);
        setInput(v.toString());
    }, [_setValue, mathMinMax]);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value;
        if (!regex.test(value))
            return;

        setValue(value);
    }, [regex, setValue]);

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
    }, [setValue, value, step, shiftMultiplier, disabledArrowKeys]);

    const onInputFocus: FocusEventHandler<HTMLInputElement> = useCallback(() => {
        setFocused(true);
    }, []);

    const onInputBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
        setFocused(false);
        setInput(value.toString());
    }, [value]);

    const onIncrementButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const isShift = e.shiftKey;
        setValue(value + (isShift ? step * shiftMultiplier : step));
    }, [setValue, value, step, shiftMultiplier]);

    const onDecrementButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const isShift = e.shiftKey;
        setValue(value - (isShift ? step * shiftMultiplier : step));
    }, [setValue, value, step, shiftMultiplier]);

    useEffect(() => {
        if (!focused)
            setInput(value.toString());
    }, [value, focused]);

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
        onInputFocus,
        onInputBlur,
        onIncrementButtonClick,
        onDecrementButtonClick,

        props: props as unknown as T
    };
};
