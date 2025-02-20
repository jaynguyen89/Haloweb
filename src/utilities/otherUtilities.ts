import { HttpStatusCode } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { StatusNxxInterceptor, TStatusInterceptorParams } from 'src/fetcher/interceptors/ResponseInterceptors';

export const surrogate = (dispatch: Dispatch, action: Function | AnyAction) => dispatch(action as unknown as AnyAction);

export const isInformationStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.Continue && statusCode < HttpStatusCode.Ok;

export const isSuccessStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.Ok && statusCode <= HttpStatusCode.ImUsed;

export const isRedirectionStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.MultipleChoices && statusCode < HttpStatusCode.BadRequest;

export const isServerErrorStatusCode = (statusCode: number | HttpStatusCode) => statusCode >= HttpStatusCode.InternalServerError;

export const setLocalStorage = (key: string, data: object) => localStorage.setItem(key, JSON.stringify(data));

export const readLocalStorage = <T>(key: string, remove?: true): T | null => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
        const data = JSON.parse(storedData);
        if (remove) localStorage.removeItem(key);

        return data as T;
    }

    return null;
};

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

// Todo: In later expansions, add 1 more param `target = InterceptorTarget.RESPONSE` to support creating request interceptors
export const createInterceptors = (data: Array<TStatusInterceptorParams>) =>
    data.map(params => new StatusNxxInterceptor(params).get());
