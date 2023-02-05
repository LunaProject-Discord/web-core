import { Dispatch, DispatchWithoutAction, SetStateAction, useState } from 'react';

export const useResettableState = <T>(initialState: T): [T, Dispatch<SetStateAction<T>>, DispatchWithoutAction] => {
    const [state, setState] = useState(initialState);
    const resetState = () => setState(initialState);
    return [state, setState, resetState];
};
