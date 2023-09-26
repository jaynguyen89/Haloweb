import { DateTime } from 'luxon';
import configs from 'src/commons/configs';
import Cookies, { CookieSetOptions } from 'universal-cookie';

export const defaultCookieSetOptions: CookieSetOptions = {
    path: '/',
    expires: DateTime.now().plus({ days: configs.cookieExpiryTime }).toJSDate(),
    maxAge: configs.cookieMaxAge,
    domain: configs.cookieDomain,
    secure: configs.cookieSecure,
    httpOnly: configs.cookieHttpOnly,
    sameSite: 'none',
};

// Singleton class
class UniqueCookies {
    private static cookies: Cookies;
    private constructor() {}

    public static getInstance(): Cookies {
        if (this.cookies) return this.cookies;

        this.cookies = new Cookies(null, defaultCookieSetOptions);
        return this.cookies;
    }
}

export default UniqueCookies;
