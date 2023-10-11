import { AxiosError, AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { InterceptorTarget } from 'src/commons/enums';
import { Interceptor, InterceptorDataType } from 'src/fetcher/Interceptor';
import Stages from 'src/models/enums/stage';
import { clearStage, setStageByName } from 'src/redux/actions/stageActions';
import { isClientErrorStatusCode, isServerErrorStatusCode, isSuccessStatusCode } from 'src/utilities/otherUtilities';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SuccessInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, data: InterceptorDataType) => {
        const response = (data as AxiosResponse<any, any>);
        if (isSuccessStatusCode(response.status)) dispatch(clearStage() as unknown as AnyAction);
    },
);

const AxiosErrorInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const axiosError = (e as AxiosError<unknown, any>);

        if (axiosError.code === 'ERR_NETWORK')
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStageByName(Stages.SHOW_TOAST_CLIENT_ERROR_NETWORK) as unknown as AnyAction);
            });
    },
);

const Error500Interceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const { response } = (e as AxiosError<unknown, any>);

        if (response && isServerErrorStatusCode(response.status)) {
            const message = `messages.error-${response?.status}`;
            batch(() => {
                dispatch(clearStage() as unknown as AnyAction);
                dispatch(setStageByName(Stages.SHOW_FLASHER_SERVER_ERROR, 'error', message) as unknown as AnyAction);
            });
        }
    },
);

export class Error400Interceptor {
    stage: Stages;
    messageKey?: string;
    messageParams?: Record<string, string>;
    canClear: boolean;

    constructor(stage: Stages, messageKey?: string, messageParams?: Record<string, string>, canClear?: false) {
        this.stage = stage;
        this.messageKey = messageKey;
        this.messageParams = messageParams;
        this.canClear = canClear === undefined ? true : canClear;
    }

    public get(): Interceptor {
        return new Interceptor(
            InterceptorTarget.RESPONSE,
            (dispatch: Dispatch, e: InterceptorDataType) => {
                const { response } = (e as AxiosError<unknown, any>);

                if (response && isClientErrorStatusCode(response.status))
                    batch(() => {
                        dispatch(clearStage() as unknown as AnyAction);
                        dispatch(setStageByName(this.stage, 'error', this.messageKey, this.messageParams, this.canClear) as unknown as AnyAction);
                    });
            },
        );
    }
}

const responseInterceptors: Array<Interceptor> = [
    SuccessInterceptor,
    AxiosErrorInterceptor,
    Error500Interceptor,
];

export default responseInterceptors;
