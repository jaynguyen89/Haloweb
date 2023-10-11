import { AnyAction, Dispatch } from 'redux';
import { ControllerEndpoints, RequestMethods } from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import IAuthenticatedUser from 'src/models/AuthenticatedUser';
import { StorageKeys } from 'src/models/enums/account';
import Stages from 'src/models/enums/stage';
import { setStage, setStageByName } from 'src/redux/actions/stageActions';
import * as authenticationConstants from 'src/redux/constants/authenticationConstants';
import { Error400Interceptor } from 'src/fetcher/interceptors/ResponseInterceptors';
import { isSuccessStatusCode } from 'src/utilities/otherUtilities';

export const prefetchAccountDataOnLaunch = () => {
    const storedAuthUser = localStorage.getItem(StorageKeys.AUTH_USER);
    const authUser = storedAuthUser ? JSON.parse(storedAuthUser) as IAuthenticatedUser : undefined;

    return (dispatch: Dispatch) => dispatch({
        type: authUser
            ? authenticationConstants.INITIALIZE_AUTH_ON_LAUNCH
            : authenticationConstants.AUTHENTICATION_VOID,
        payload: authUser,
    });
};

export const sendRequestToGetSecretCode = (destination: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setStageByName(Stages.REQUEST_TO_GET_SECRET_CODE_BEGIN) as unknown as AnyAction);

        const error422Interceptor = new Error400Interceptor(
            Stages.ACTIVATE_ACCOUNT_INVALID_EMAIL_ADDRESS_OR_PHONE_NUMBER,
            'activate-account-page.request-to-get-secret-code-invalid-destination',
            { destination },
            false,
        ).get();

        const request = new RequestBuilder<number>()
            .withMethod(RequestMethods.GET)
            .withEndpoint(`${ControllerEndpoints.AUTHENTICATION}/send-secret-code/${destination}`)
            .withResponseInterceptor(error422Interceptor)
            .build();

        const result = await request.send(dispatch);

        dispatch(setStage({
            name: Stages.REQUEST_TO_GET_SECRET_CODE_DONE,
            canClear: false,
        }) as unknown as AnyAction);
        
        if (typeof result === 'number' && isSuccessStatusCode(result)) dispatch({
            type: authenticationConstants.ACTIVATE_ACCOUNT_SECRET_CODE_SENT,
        });
    };
};
