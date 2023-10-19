import { HttpStatusCode } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { IStorageMessage } from 'src/commons/interfaces';
import { removeStorageMessageKey, setStorageMessageKey } from 'src/redux/actions/stageActions';

export const surrogate = (dispatch: Dispatch, action: Function | AnyAction) => dispatch(action as unknown as AnyAction);

export const isSuccessStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.Ok && statusCode <= HttpStatusCode.MultiStatus;

export const isClientErrorStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.BadRequest && statusCode < HttpStatusCode.InternalServerError;

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
        if (remove === undefined || remove) {
            localStorage.removeItem(key);
            surrogate(dispatch, removeStorageMessageKey(key));
        }

        return { storageKey: key, ...message };
    }

    return null;
};
