import { HttpStatusCode } from 'axios';
import { Dispatch } from 'redux';
import { ControllerEndpoints, HttpHeaderKeys, RequestMethods, StorageKeys, TokenDestination } from 'src/commons/enums';
import { StatusNxxInterceptor } from 'src/fetcher/interceptors/ResponseInterceptors';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import RequestOption from 'src/fetcher/RequestOption';
import { IAuthenticatedUser, IRegistrationData, ITokenData } from 'src/models/Authentication';
import Stages from 'src/models/enums/stage';
import { removeStage, setStage, setStageByName } from 'src/redux/actions/stageActions';
import * as authenticationConstants from 'src/redux/constants/authenticationConstants';
import { isSuccessStatusCode, surrogate } from 'src/utilities/otherUtilities';

export const prefetchAccountDataOnLaunch = () => {
    const storedAuthUser = localStorage.getItem(StorageKeys.AUTH_USER);
    const authUser = storedAuthUser ? JSON.parse(storedAuthUser) as IAuthenticatedUser : undefined;

    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: authUser
            ? authenticationConstants.INITIALIZE_AUTH_ON_LAUNCH
            : authenticationConstants.AUTHENTICATION_VOID,
        payload: authUser,
    });
};

export const sendRequestToRegisterAccount = (registrationData: IRegistrationData, recaptchaToken: string | null) => {
    return async (dispatch: Dispatch) => {
        surrogate(dispatch, setStageByName(Stages.REQUEST_TO_REGISTER_ACCOUNT_BEGIN));

        const error400Interceptor = new StatusNxxInterceptor(
            Stages.REGISTER_ACCOUNT_BAD_REQUEST_INVALID_DATA,
            HttpStatusCode.BadRequest,
            false,
        ).get();

        const error409Interceptor = new StatusNxxInterceptor(
            Stages.REGISTER_ACCOUNT_CONFLICT_EMAIL_ADDRESS_OR_PHONE_NUMBER,
            HttpStatusCode.Conflict,
            false,
        ).get();

        const requestBuilder = new RequestBuilder<number>()
            .withMethod(RequestMethods.POST)
            .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/register-account`)
            .withBody(registrationData)
            .withOptions(new RequestOption(false))
            .withResponseInterceptors([error400Interceptor, error409Interceptor]);

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
};

export const sendRequestToGetSecretCode = (accountId: string, destination: TokenDestination) => {
    return async (dispatch: Dispatch) => {
        surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_SECRET_CODE_BEGIN));

        const status100Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_GET_SECRET_CODE_UNNECESSARY,
            HttpStatusCode.Continue,
            undefined,
            'activate-account-page.request-to-get-secret-code-unnecessary',
        ).get();

        const error404Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_GET_SECRET_CODE_NO_PENDING_ACTIVATION_FOUND,
            HttpStatusCode.NotFound,
            undefined,
            'activate-account-page.request-to-get-secret-code-no-pending-activation-found',
        ).get();

        const error422Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_GET_SECRET_CODE_INVALID_EMAIL_OR_PHONE,
            HttpStatusCode.UnprocessableEntity,
            undefined,
            'activate-account-page.request-to-get-secret-code-invalid-destination',
        ).get();

        const error410Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_GET_SECRET_CODE_ACTIVATION_TIME_ELAPSED,
            HttpStatusCode.Gone,
            undefined,
            'activate-account-page.request-to-get-secret-code-activation-time-elapsed',
        ).get();

        const request = new RequestBuilder<undefined>()
            .withMethod(RequestMethods.GET)
            .withHeader('AccountId', accountId)
            .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/send-secret-code`)
            .withQuery('destination', `${destination}`)
            .withResponseInterceptors([status100Interceptor, error404Interceptor, error410Interceptor, error422Interceptor])
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
};

export const sendRequestToActivateAccount = (accountId: string, body: ITokenData, recaptchaToken: string | null) => {
    return async (dispatch: Dispatch) => {
        surrogate(dispatch, setStageByName(Stages.REQUEST_TO_ACTIVATE_ACCOUNT_BEGIN));

        const error400Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_ACTIVATE_ACCOUNT_SECRET_CODE_MISSING,
            HttpStatusCode.BadRequest,
            undefined,
            'activate-account-page.activate-account-response-error-400',
        ).get();

        const error403Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_ACTIVATE_ACCOUNT_INVALID_SECRET_CODE,
            HttpStatusCode.Forbidden,
            undefined,
            'activate-account-page.activate-account-response-error-403',
        ).get();

        const error409Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_ACTIVATE_ACCOUNT_MISMATCHED_TOKENS,
            HttpStatusCode.Conflict,
            undefined,
            'activate-account-page.activate-account-response-error-409',
        ).get();

        const error410Interceptor = new StatusNxxInterceptor(
            Stages.REQUEST_TO_ACTIVATE_ACCOUNT_TOKEN_EXPIRED,
            HttpStatusCode.Gone,
        ).get();

        const requestBuilder = new RequestBuilder<number>()
            .withMethod(RequestMethods.PUT)
            .withHeader('AccountId', accountId)
            .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/activate-account`)
            .withBody(body)
            .withResponseInterceptors([error400Interceptor, error403Interceptor, error409Interceptor, error410Interceptor]);

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
};
