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

// Todo: In later expansions, add 1 more param `target = InterceptorTarget.RESPONSE` to support creating request interceptors
export const createInterceptors = (data: Array<TStatusInterceptorParams>) =>
    data.map(params => new StatusNxxInterceptor(params).get());
