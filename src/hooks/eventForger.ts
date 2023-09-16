import { debounce, throttle } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import configs from 'src/commons/configs';

type DebounceSettings = {
    leading?: boolean | undefined;
    maxWait?: number | undefined;
    trailing?: boolean | undefined;
}

type ThrottleSettings = Omit<DebounceSettings, 'maxWait'>;

export const useDebounce = (callback: Function, duration?: number, options?: DebounceSettings) => {
    const ref = useRef<Function>();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    return useMemo(() => {
        const runCallback = () => {
            ref.current?.();
        };

        const wait = duration ?? configs.debounceWaitDuration;
        return debounce(runCallback, wait, options);
    }, []);
};

export const useThrottle = (callback: Function, duration?: number, options?: ThrottleSettings) => {
    const ref = useRef<Function>();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    return useMemo(() => {
        const runCallback = () => {
            ref.current?.();
        };

        const wait = duration ?? configs.throttleWaitDuration;
        return throttle(runCallback, wait, options);
    }, []);
};
