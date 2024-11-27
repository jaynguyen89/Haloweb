import { HttpStatusCode } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { InterceptorTarget } from 'src/commons/enums';
import { IStorageMessage } from 'src/commons/interfaces';
import { StatusNxxInterceptor, TStatusInterceptorParams } from 'src/fetcher/interceptors/ResponseInterceptors';
import { removeStorageMessageKey, setStorageMessageKey } from 'src/redux/actions/stageActions';

export const surrogate = (dispatch: Dispatch, action: Function | AnyAction) => dispatch(action as unknown as AnyAction);

export const isInformationStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.Continue && statusCode < HttpStatusCode.Ok;

export const isSuccessStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.Ok && statusCode <= HttpStatusCode.ImUsed;

export const isRedirectionStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.MultipleChoices && statusCode < HttpStatusCode.BadRequest;

export const isServerErrorStatusCode = (statusCode: number | HttpStatusCode) => statusCode >= HttpStatusCode.InternalServerError;

export const setStorageMessage = (dispatch: Dispatch, {
    storageKey,
    ...rest
}: IStorageMessage) => {
    localStorage.setItem(storageKey, JSON.stringify({ ...rest }));
    surrogate(dispatch, setStorageMessageKey(storageKey));
};

export const readStorageMessage = (dispatch: Dispatch, key: string, remove?: true): IStorageMessage | null => {
    const storedMessage = localStorage.getItem(key);
    if (storedMessage) {
        const message = JSON.parse(storedMessage);
        if (remove) {
            localStorage.removeItem(key);
            surrogate(dispatch, removeStorageMessageKey(key));
        }

        return { storageKey: key, ...message };
    }

    return null;
};

export const createInterceptors = (data: Array<TStatusInterceptorParams>, target = InterceptorTarget.RESPONSE) =>
    data.map(params => new StatusNxxInterceptor(params).get());
