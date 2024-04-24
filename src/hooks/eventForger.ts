import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { useEffect, useMemo, useRef } from 'react';
import configs from 'src/commons/configs';

type DebounceSettings = {
    leading?: boolean | undefined;
    maxWait?: number | undefined;
    trailing?: boolean | undefined;
}

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

type ThrottleSettings = Omit<DebounceSettings, 'maxWait'>;

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
