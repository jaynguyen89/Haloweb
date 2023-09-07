import { AxiosError, AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { InterceptorTarget } from 'src/commons/enums';
import { IErrorCodeData } from 'src/commons/interfaces';
import { Interceptor, InterceptorDataType } from 'src/fetcher/Interceptor';
import Stages from 'src/models/enums/stage';
import { clearStage, setErrorData, setStage, setStageByName } from 'src/redux/actions/stageActions';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SuccessInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, data: InterceptorDataType) => {
        const axiosResponse = (data as AxiosResponse<any, any>);
        if (axiosResponse.status > 199 && axiosResponse.status < 300)
            dispatch(clearStage() as unknown as AnyAction);
    },
);

/* eslint-disable  @typescript-eslint/no-explicit-any */
const AxiosErrorInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const axiosError = (e as AxiosError<unknown, any>);

        if (axiosError.code === 'ERR_NETWORK') {
            const code = `${axiosError.code} - ${axiosError.message}`;
            const message = 'messages.error-network';
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStageByName(Stages.TOGGLE_FLASHER_VISIBLE, code, message) as unknown as AnyAction);
            });
        }
    },
);

const ErrorMessageInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const { response } = (e as AxiosError<unknown, any>);

        if (response && response.data?.hasOwnProperty('value'))
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setErrorData((response.data as IErrorCodeData).value!) as unknown as AnyAction);
            });
    },
);

const ErrorCodeInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const { response } = (e as AxiosError<unknown, any>);

        if (response && !response.data?.hasOwnProperty('value')) {
            const code = `${response?.status} - ${(response?.data as IErrorCodeData).statusCodeName}`;

            if (!(response.data as IErrorCodeData).isHandled) {
                batch(() => {
                    dispatch(clearStage() as unknown as AnyAction);
                    dispatch(setStageByName(Stages.TOGGLE_FULL_PAGE_ERROR, code) as unknown as AnyAction);
                });
            }

            const message = `messages.error-${response?.status}`;
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStageByName(Stages.TOGGLE_FLASHER_VISIBLE, code, message) as unknown as AnyAction);
            });
        }
    },
);

const responseInterceptors: Array<Interceptor> = [
    SuccessInterceptor,
    AxiosErrorInterceptor,
    ErrorMessageInterceptor,
    ErrorCodeInterceptor,
];

export default responseInterceptors;
