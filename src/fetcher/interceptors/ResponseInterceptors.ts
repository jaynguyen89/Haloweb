import { AxiosError, AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { InterceptorTarget } from 'src/commons/enums';
import { IErrorCodeData } from 'src/commons/interfaces';
import { Interceptor, InterceptorDataType } from 'src/fetcher/Interceptor';
import Stages from 'src/models/enums/stage';
import { clearStage, setErrorData, setStageByName, setStatusCode } from 'src/redux/actions/stageActions';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SuccessInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, data: InterceptorDataType) => {
        const response = (data as AxiosResponse<any, any>);
        if (response.status > 199 && response.status < 300)
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStatusCode(response?.status) as unknown as AnyAction);
            });
    },
);

/* eslint-disable  @typescript-eslint/no-explicit-any */
const AxiosErrorInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const axiosError = (e as AxiosError<unknown, any>);

        if (axiosError.code === 'ERR_NETWORK')
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStageByName(Stages.SHOW_TOAST_ERROR_NETWORK) as unknown as AnyAction);
            });
    },
);

const Error400Interceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const { response } = (e as AxiosError<unknown, any>);

        if (response && response?.status > 399 && response?.status < 500)
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStageByName(Stages.SHOW_TOAST_CLIENT_ERROR, 'error') as unknown as AnyAction);
                dispatch(setStatusCode(response?.status) as unknown as AnyAction);

                if (response.data?.hasOwnProperty('value'))
                    dispatch(setErrorData((response.data as IErrorCodeData).value!) as unknown as AnyAction);
            });
    },
);

const Error500Interceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const { response } = (e as AxiosError<unknown, any>);

        if (response && response?.status > 499) {
            const message = `messages.error-${response?.status}`;
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStageByName(Stages.SHOW_FLASHER_SERVER_ERROR, 'error', message) as unknown as AnyAction);
            });
        }
    },
);

const responseInterceptors: Array<Interceptor> = [
    SuccessInterceptor,
    AxiosErrorInterceptor,
    Error400Interceptor,
    Error500Interceptor,
];

export default responseInterceptors;
