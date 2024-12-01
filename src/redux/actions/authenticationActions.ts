import { HttpStatusCode } from 'axios';
import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import {
    ControllerEndpoints,
    HttpHeaderKeys,
    RequestHeaderKeys,
    RequestMethods,
    StorageKeys,
    TokenDestination,
} from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import {
    IAuthenticationData, IAuthorization,
    ILoginInformation,
    IRegistrationData,
    ITokenData,
} from 'src/models/Authentication';
import Stages from 'src/models/enums/stage';
import { removeStage, setStage, setStageByName } from 'src/redux/actions/stageActions';
import * as authenticationConstants from 'src/redux/constants/authenticationConstants';
import { createInterceptors, isSuccessStatusCode, surrogate } from 'src/utilities/otherUtilities';

export const prefetchAccountDataOnLaunch = () => {
    const storedAuthorization = localStorage.getItem(StorageKeys.AUTHORIZATION);
    const authorization = storedAuthorization ? JSON.parse(storedAuthorization) as IAuthorization : undefined;

    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: authorization
            ? authenticationConstants.INITIALIZE_AUTH_ON_LAUNCH
            : authenticationConstants.AUTHENTICATION_VOID,
        payload: authorization,
    });
};

export const sendRequestToRegisterAccount = (registrationData: IRegistrationData, recaptchaToken: string | null) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_REGISTER_ACCOUNT_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REGISTER_ACCOUNT_BAD_REQUEST_INVALID_DATA,
            statusCode: HttpStatusCode.BadRequest,
            canClear: false,
        },
        {
            stage: Stages.REGISTER_ACCOUNT_CONFLICT_EMAIL_ADDRESS_OR_PHONE_NUMBER,
            statusCode: HttpStatusCode.Conflict,
            canClear: false,
        },
    ]);

    const requestBuilder = new RequestBuilder<number>()
        .withMethod(RequestMethods.POST)
        .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/register-account`)
        .withBody(registrationData)
        .withResponseInterceptors(responseInterceptors);

    if (recaptchaToken) requestBuilder.withHeader(HttpHeaderKeys.RECAPTCHA_TOKEN, recaptchaToken);
    const request = requestBuilder.build();

    const result = await request.send(dispatch);
    const isSuccess = result && isSuccessStatusCode(result.status);

    isSuccess && surrogate(dispatch, setStageByName(Stages.REQUEST_TO_REGISTER_ACCOUNT_SUCCESS));

    surrogate(dispatch, {
        type: isSuccess ? authenticationConstants.REGISTER_ACCOUNT_SUCCESS : authenticationConstants.REGISTER_ACCOUNT_FAILED,
        payload: isSuccess ? undefined : result?.data,
    });
};

export const sendRequestToGetSecretCode = (accountId: string, destination: TokenDestination) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_SECRET_CODE_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_GET_SECRET_CODE_UNNECESSARY,
            statusCode: HttpStatusCode.Continue,
            messageKey: 'activate-account-page.request-to-get-secret-code-unnecessary',
        },
        {
            stage: Stages.REQUEST_TO_GET_SECRET_CODE_NO_PENDING_ACTIVATION_FOUND,
            statusCode: HttpStatusCode.NotFound,
            messageKey: 'activate-account-page.request-to-get-secret-code-no-pending-activation-found',
        },
        {
            stage: Stages.REQUEST_TO_GET_SECRET_CODE_INVALID_EMAIL_OR_PHONE,
            statusCode: HttpStatusCode.UnprocessableEntity,
            messageKey: 'activate-account-page.request-to-get-secret-code-invalid-destination',
        },
        {
            stage: Stages.REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED,
            statusCode: HttpStatusCode.Gone,
            messageKey: 'activate-account-page.request-to-get-secret-code-activation-time-elapsed',
        },
    ]);

    const request = new RequestBuilder<undefined>()
        .withMethod(RequestMethods.GET)
        .withHeader(RequestHeaderKeys.AccountId, accountId)
        .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/send-secret-code`)
        .withQuery('destination', `${destination}`)
        .withResponseInterceptors(responseInterceptors)
        .build();

    const result = await request.send(dispatch);

    surrogate(dispatch, setStage({
        name: Stages.REQUEST_TO_GET_SECRET_CODE_DONE,
        canClear: false,
    }));

    if (isSuccessStatusCode(result?.status ?? 0)) surrogate(dispatch, {
        type: authenticationConstants.ACTIVATE_ACCOUNT_SECRET_CODE_SENT,
    });
};

export const sendRequestToActivateAccount = (accountId: string, body: ITokenData, recaptchaToken: string | null) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_ACTIVATE_ACCOUNT_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_ACTIVATE_ACCOUNT_SECRET_CODE_MISSING,
            statusCode: HttpStatusCode.BadRequest,
            messageKey: 'activate-account-page.activate-account-response-error-400',
        },
        {
            stage: Stages.REQUEST_TO_ACTIVATE_ACCOUNT_INVALID_SECRET_CODE,
            statusCode: HttpStatusCode.Forbidden,
            messageKey: 'activate-account-page.activate-account-response-error-403',
        },
        {
            stage: Stages.REQUEST_TO_ACTIVATE_ACCOUNT_MISMATCHED_TOKENS,
            statusCode: HttpStatusCode.Conflict,
            messageKey: 'activate-account-page.activate-account-response-error-409',
        },
        {
            stage: Stages.REQUEST_TO_ACTIVATE_ACCOUNT_TOKEN_EXPIRED,
            statusCode: HttpStatusCode.Gone,
        },
    ]);

    const requestBuilder = new RequestBuilder<number>()
        .withMethod(RequestMethods.PUT)
        .withHeader(RequestHeaderKeys.AccountId, accountId)
        .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/activate-account`)
        .withBody(body)
        .withResponseInterceptors(responseInterceptors);

    if (recaptchaToken) requestBuilder.withHeader(HttpHeaderKeys.RECAPTCHA_TOKEN, recaptchaToken);

    const request = requestBuilder.build();
    const result = await request.send(dispatch);
    const isSuccess = result && isSuccessStatusCode(result.status);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_ACTIVATE_ACCOUNT_BEGIN));
    isSuccess && surrogate(dispatch, setStageByName(Stages.REQUEST_TO_ACTIVATE_ACCOUNT_SUCCESS));

    surrogate(dispatch, {
        type: isSuccess ? authenticationConstants.ACTIVATE_ACCOUNT_SUCCESS : authenticationConstants.ACTIVATE_ACCOUNT_FAILED,
        payload: isSuccess ? undefined : result?.data,
    });
};

export const sendRequestToLoginByCredentials = (
    loginData: IAuthenticationData,
    recaptchaToken: string | null = null,
) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_LOGIN_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_LOGIN_BAD_REQUEST,
            statusCode: HttpStatusCode.BadRequest,
        },
        {
            stage: Stages.REQUEST_TO_LOGIN_UNACTIVATED_ACCOUNT,
            statusCode: HttpStatusCode.UnprocessableEntity,
        },
    ]);

    const requestBuilder = new RequestBuilder<IAuthorization>()
        .withMethod(RequestMethods.POST)
        .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/authenticate-by-credentials`)
        .withBody(loginData)
        .withResponseInterceptors(responseInterceptors);

    if (recaptchaToken) requestBuilder.withHeader(RequestHeaderKeys.RecaptchaToken, recaptchaToken);

    const request = requestBuilder.build();
    const result = await request.send(dispatch);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_LOGIN_BEGIN));
    const isSuccess = result && isSuccessStatusCode(result.status);

    if (isSuccess)
        batch(() => {
            surrogate(dispatch, setStageByName(Stages.REQUEST_TO_LOGIN_SUCCESS));
            surrogate(dispatch, {
                type: authenticationConstants.LOGIN_SUCCESS,
                payload: result?.data,
            });
        });
    else
        batch(() => {
            surrogate(dispatch, setStageByName(Stages.LOGIN_FAILURE));
            surrogate(dispatch, {
                type: authenticationConstants.LOGIN_FAILURE,
                payload: { statusCode: result?.status, data: result?.data },
            });
        });
};

export const sendRequestToLoginByOtp = (
    loginData: ILoginInformation,
    recaptchaToken: string | null = null,
) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_LOGIN_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_LOGIN_BAD_REQUEST,
            statusCode: HttpStatusCode.BadRequest,
        },
        {
            stage: Stages.REQUEST_TO_LOGIN_UNACTIVATED_ACCOUNT,
            statusCode: HttpStatusCode.UnprocessableEntity,
        },
    ]);

    const requestBuilder = new RequestBuilder<IAuthorization>()
        .withMethod(RequestMethods.POST)
        .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/authenticate-by-otp`)
        .withBody(loginData)
        .withResponseInterceptors(responseInterceptors);

    if (recaptchaToken) requestBuilder.withHeader(RequestHeaderKeys.RecaptchaToken, recaptchaToken);

    const request = requestBuilder.build();
    const result = await request.send(dispatch);
    const isSuccess = result && isSuccessStatusCode(result.status);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_LOGIN_BEGIN));
    if (isSuccess)
        batch(() => {
            surrogate(dispatch, setStageByName(Stages.REQUEST_TO_LOGIN_SUCCESS));
            surrogate(dispatch, {
                type: authenticationConstants.PRE_LOGIN_SUCCESS,
                payload: result?.data,
            });
        });
    else
        batch(() => {
            surrogate(dispatch, setStageByName(Stages.LOGIN_FAILURE));
            surrogate(dispatch, {
                type: authenticationConstants.LOGIN_FAILURE,
                payload: { statusCode: result?.status, data: result?.data },
            });
        });
};

export const sendRequestToVerifyOtp = (
    authorization: IAuthorization,
    otp: string,
) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_LOGIN_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_LOGIN_PREAUTH_TIMEOUT,
            statusCode: HttpStatusCode.Gone,
        },
    ]);

    const response = await new RequestBuilder<IAuthorization>()
        .withMethod(RequestMethods.POST)
        .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/verify-otp`)
        .withHeader(RequestHeaderKeys.OTP, otp)
        .withResponseInterceptors(responseInterceptors)
        .withBody({})
        .build(authorization)
        .send(dispatch);

    const isSuccess = response && isSuccessStatusCode(response.status);
    surrogate(dispatch, removeStage(Stages.REQUEST_TO_LOGIN_BEGIN));

    if (isSuccess)
        batch(() => {
            surrogate(dispatch, setStageByName(Stages.REQUEST_TO_LOGIN_SUCCESS));
            surrogate(dispatch, {
                type: authenticationConstants.LOGIN_SUCCESS,
                payload: response?.data,
            });
        });
    else
        batch(() => {
            surrogate(dispatch, setStageByName(Stages.LOGIN_FAILURE));
            surrogate(dispatch, {
                type: authenticationConstants.LOGIN_FAILURE,
                payload: { statusCode: response?.status, data: response?.data },
            });
        });
};
