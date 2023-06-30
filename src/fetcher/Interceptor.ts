import { AxiosError, AxiosResponse } from 'axios';
import { InterceptorTarget } from '../commons/enums';
import Request from './Request';

export class Interceptor {
    target: InterceptorTarget;
    callback: Function;

    constructor(target: InterceptorTarget, callback: Function) {
        this.target = target;
        this.callback = callback;
    }
}

export class InterceptorChain {
    callback: Function;
    next?: InterceptorChain;

    constructor(
        callback: Function,
        next?: InterceptorChain,
    ) {
        this.callback = callback;
        this.next = next;
    }

    public runRequestInterceptors(data: Request<unknown>): void {
        this.callback(data);
        if (this.next) this.next.callback(data);
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    public runResponseInterceptors(data: AxiosResponse<any, any> | AxiosError<unknown, any> | unknown): void {
        this.callback(data);
        if (this.next) this.next.callback(data);
    }
}
