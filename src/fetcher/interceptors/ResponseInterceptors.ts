import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import { InterceptorTarget} from 'src/commons/enums';
import { Interceptor, InterceptorDataType } from 'src/fetcher/Interceptor';
import Stages from 'src/models/enums/stage';
import { clearStage, setStageByName } from 'src/redux/actions/stageActions';
import {
    isInformationStatusCode, isRedirectionStatusCode,
    isServerErrorStatusCode,
    isSuccessStatusCode,
    surrogate,
} from 'src/utilities/otherUtilities';
import { AlertColor } from '@mui/material';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SuccessInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, data: InterceptorDataType) => {
        const response = (data as AxiosResponse<any, any>);
        if (isSuccessStatusCode(response.status)) surrogate(dispatch, clearStage());
    },
);

const AxiosErrorInterceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const axiosError = (e as AxiosError<unknown, any>);

        if (axiosError.code === 'ERR_NETWORK')
            batch(() => {
                surrogate(dispatch, clearStage());
                surrogate(dispatch, setStageByName(Stages.SHOW_TOAST_CLIENT_ERROR_NETWORK));
            });
    },
);

const Error500Interceptor = new Interceptor(
    InterceptorTarget.RESPONSE,
    (dispatch: Dispatch, e: InterceptorDataType) => {
        const { response } = (e as AxiosError<unknown, any>);

        if (response && isServerErrorStatusCode(response.status)) {
            const codeType: AlertColor = isInformationStatusCode(response!.status)
                                         ? 'info' : isRedirectionStatusCode(response!.status)
                                                    ? 'warning' : 'error';

            const message = `messages.error-${response?.status}`;
            batch(() => {
                surrogate(dispatch, clearStage());
                surrogate(dispatch, setStageByName(Stages.SHOW_FLASHER_SERVER_ERROR, codeType, message));
            });
        }
    },
);

export type TStatusInterceptorParams = {
    stage: Stages,
    statusCode: HttpStatusCode,
    canClear?: boolean,
    messageKey?: string,
    messageParams?: Record<string, string>,
};

/* To create custom error handlers for status codes 1xx, 3xx, 4xx, 5xx */
export class StatusNxxInterceptor {
    stage: Stages;
    statusCode: HttpStatusCode;
    messageKey?: string;
    messageParams?: Record<string, string>;
    canClear: boolean;

    constructor({ stage, statusCode, canClear, messageKey, messageParams }: TStatusInterceptorParams) {
        this.stage = stage;
        this.statusCode = statusCode;
        this.messageKey = messageKey;
        this.messageParams = messageParams;
        this.canClear = canClear === undefined ? true : canClear;
    }

    public get(): Interceptor {
        return new Interceptor(
            InterceptorTarget.RESPONSE,
            (dispatch: Dispatch, e: InterceptorDataType) => {
                const { response } = (e as AxiosError<unknown, any>);

                if (response && response.status === this.statusCode)
                    batch(() => {
                        surrogate(dispatch, clearStage());
                        surrogate(dispatch, setStageByName(this.stage, 'error', this.messageKey, this.messageParams, this.canClear));
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
