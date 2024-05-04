import { Dispatch, DispatchWithoutAction, SetStateAction, useCallback, useState } from 'react';

export type ResettableState<T> = [T, Dispatch<SetStateAction<T>>, DispatchWithoutAction];

export const useResettableState = <T>(initialState: T | (() => T)): ResettableState<T> => {
    const [state, setState] = useState(initialState);
    const resetState = useCallback(() => setState(initialState), [initialState]);
    return [state, setState, resetState];
};

export const getStateActionValue = <T>(action: SetStateAction<T>, prevValue: T): T => typeof action === 'function' ? (action as (prevState: T) => T)(prevValue) : action;

export interface UniqueId {
    _id: string;
}

export const updateArrayState = <T extends UniqueId>(
    setState: Dispatch<SetStateAction<T[]>>,
    setValue: Dispatch<SetStateAction<Omit<T, '_id'>[]>> | undefined = undefined
) => (
    id: string,
    data: T | undefined
) => setState((values) => {
    const array = [...values];

    const i = array.findIndex((data) => data._id === id);
    if (i !== -1)
        data ? array.splice(i, 1, data) : array.splice(i, 1);

    if (i === -1 && data)
        array.push(data);

    if (setValue)
        setValue(array.map(({ _id, ...data }) => data));

    return array;
});
