import { useCallback, useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

export const useThrottle = <T>(callback: (args: T) => void, duration: number) => {
    const scrollingTimer = useRef<undefined | NodeJS.Timeout>();

    return useCallback(
        (args: T) => {
            if (scrollingTimer.current) return;
            scrollingTimer.current = setTimeout(() => {
                callback(args);
                scrollingTimer.current = undefined;
            }, duration);
        },
        [scrollingTimer, callback, duration]
    );
};
