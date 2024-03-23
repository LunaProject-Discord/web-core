import { Dispatch, DispatchWithoutAction, SetStateAction, useCallback, useState } from 'react';

export const useResettableState = <T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>, DispatchWithoutAction] => {
    const [state, setState] = useState(initialState);
    const resetState = useCallback(() => setState(initialState), [initialState]);
    return [state, setState, resetState];
};
