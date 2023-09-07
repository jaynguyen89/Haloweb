import { Dispatch } from 'redux';
import { InterceptorTarget } from 'src/commons/enums';
import { Interceptor } from 'src/fetcher/Interceptor';

const InitializingInterceptor = new Interceptor(
    InterceptorTarget.REQUEST,
    (_: Dispatch) => console.log('request interceptor: awaiting implementation'),
);

const requestInterceptors: Array<Interceptor> = [
    InitializingInterceptor,
];

export default requestInterceptors;
