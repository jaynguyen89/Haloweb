import UniqueCookies from 'src/utilities/cookies-helpers/constants';

export const extractCookiesForObject = <T extends object>(any: T): T | undefined => {
    const keys = Object.keys(any) as Array<keyof T>;
    const tObject: T = {} as T;

    const isExisted = new Array<boolean>();
    for (let i = 0; i < keys.length; i++) isExisted[i] = true;

    const cookies = UniqueCookies.getInstance();
    for (let i = 0; i < keys.length; i++){
        const key = keys[i];
        const valueInCookie = cookies.get(key as string);

        if (valueInCookie === null || valueInCookie === undefined) {
            isExisted[i] = false;
            continue;
        }
        tObject[key] = JSON.parse(valueInCookie);
    }

    return isExisted.every(x => !x) ? undefined : tObject;
};

export const setCookiesForObject = <T extends object>(key: string, any: T) => {
    const cookies = UniqueCookies.getInstance();
    cookies.set(key, JSON.stringify(any));
};

export const setCookiesPerObjectKey = <T extends object>(any: T) => {
    const cookies = UniqueCookies.getInstance();
    Object.keys(any).forEach(key => cookies.set(key, JSON.stringify(any[key as keyof T])));
};

export const getCookieObject = <T extends object>(key: string): T | undefined => {
    const cookies = UniqueCookies.getInstance();
    const valueFromCookie = cookies.get(key);
    return valueFromCookie ? JSON.parse(valueFromCookie) as T : undefined;
};

export const getCookieStringValue = (key: string): string | undefined => {
    const cookies = UniqueCookies.getInstance();
    return cookies.get(key);
};

export const getCookieNumericValue = (key: string): number | undefined => {
    const cookies = UniqueCookies.getInstance();
    const valueFromCookie = cookies.get(key);
    return valueFromCookie ? +valueFromCookie : undefined;
};

export const getCookieBooleanValue = (key: string): boolean | undefined => {
    const cookies = UniqueCookies.getInstance();
    const valueFromCookie = cookies.get(key);
    return valueFromCookie ? valueFromCookie === 'true' : undefined;
};

export const removeCookiesEntries = (...keys: string[]) => {
    const cookies = UniqueCookies.getInstance();
    keys.forEach(key => cookies.remove(key));
};
