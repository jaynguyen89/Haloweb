import { InterceptorTarget } from '../commons/enums';

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

    public run(): void {
        this.callback();
        if (this.next) this.next.callback();
    }
}
