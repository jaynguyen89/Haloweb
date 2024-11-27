import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { InterceptorTarget } from 'src/commons/enums';
import Request from 'src/fetcher/Request';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type InterceptorDataType = Request<unknown> | AxiosResponse<any, any> | AxiosError<unknown, any> | unknown;

const CallbackFunction = (
    dispatch: Dispatch,
    data?: InterceptorDataType,
) => {};

export class Interceptor {
    target: InterceptorTarget;
    callback: typeof CallbackFunction;

    constructor(
        target: InterceptorTarget,
        callback: typeof CallbackFunction,
    ) {
        this.target = target;
        this.callback = callback;
    }
}

export class InterceptorChain {
    callback: typeof CallbackFunction;
    next?: InterceptorChain;

    constructor(
        callback: typeof CallbackFunction,
        next?: InterceptorChain,
    ) {
        this.callback = callback;
        this.next = next;
    }

    public runRequestInterceptors(dispatch: Dispatch, data?: InterceptorDataType, nextChain?: InterceptorChain): void {
        if (nextChain) {
            nextChain.callback(dispatch, data);
            if (nextChain.next) this.runRequestInterceptors(dispatch, data, nextChain.next);
        }
        else {
            this.callback(dispatch, data);
            if (this.next) this.runRequestInterceptors(dispatch, data, this.next);
        }
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    public runResponseInterceptors(
        dispatch: Dispatch,
        data: AxiosResponse<any, any> | AxiosError<unknown, any> | unknown,
        nextChain?: InterceptorChain,
    ): void {
        if (nextChain) {
            nextChain.callback(dispatch, data);
            if (nextChain.next) this.runResponseInterceptors(dispatch, data, nextChain.next);
        }
        else {
            this.callback(dispatch, data);
            if (this.next) this.runResponseInterceptors(dispatch, data, this.next);
        }
    }
}
