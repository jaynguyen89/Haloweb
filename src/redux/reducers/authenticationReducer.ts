import { HttpStatusCode } from 'axios';
import configs from 'src/commons/configs';
import * as authenticationConstants from 'src/redux/constants/authenticationConstants';
import produce from 'immer';
import { AnyAction } from 'redux';
import { IAuthorization } from 'src/models/Authentication';

interface IAuthenticationStore {
    accountActivation: {
        isSecretCodeSent: boolean,
        activationSuccess: boolean,
        activationError?: object,
    },
    accountRegistration: {
        success: boolean,
        error?: object,
    },
    loginFailure: {
        count?: number,
        lockedCount?: number,
        statusCode: number,
        isSuspended?: boolean,
        timestamp?: number,
    } | null,
    authorization: IAuthorization | null,
}

const initialState: IAuthenticationStore = {
    accountActivation: {
        isSecretCodeSent: false,
        activationSuccess: false,
        activationError: undefined,
    },
    accountRegistration: {
        success: false,
        error: undefined,
    },
    loginFailure: null,
    authorization: null,
};

const reducer = produce((state: IAuthenticationStore, action: AnyAction) => {
    switch (action.type) {
        case authenticationConstants.INITIALIZE_AUTH_ON_LAUNCH:
        case authenticationConstants.LOGIN_SUCCESS:
            state.authorization = action.payload;
            return;
        case authenticationConstants.REGISTER_ACCOUNT_FAILED:
            state.accountRegistration.success = false;
            state.accountRegistration.error = action.payload;
            return;
        case authenticationConstants.REGISTER_ACCOUNT_SUCCESS:
            state.accountRegistration.success = true;
            state.accountRegistration.error = undefined;
            return;
        case authenticationConstants.ACTIVATE_ACCOUNT_FAILED:
            state.accountActivation.activationSuccess = false;
            state.accountActivation.activationError = action.payload;
            return;
        case authenticationConstants.ACTIVATE_ACCOUNT_SUCCESS:
            state.accountActivation.activationSuccess = true;
            state.accountActivation.activationError = undefined;
            return;
        case authenticationConstants.LOGIN_FAILURE:
            const { statusCode, data } = action.payload;

            if (statusCode === HttpStatusCode.Conflict)
                state.loginFailure = {
                    count: data.loginFailedCount,
                    lockedCount: data.lockOutCount,
                };

            if (statusCode === HttpStatusCode.Locked)
                state.loginFailure = {
                    isSuspended: data.isSuspended,
                    timestamp: data.timestamp,
                    count: data.loginFailedCount,
                    lockedCount: data.lockOutCount,
                };

            state.loginFailure.statusCode = statusCode;
            return;
        case authenticationConstants.AUTHENTICATION_VOID:
            state.authorization = null;
            return;
        case authenticationConstants.ACTIVATE_ACCOUNT_SECRET_CODE_SENT:
            state.accountActivation.isSecretCodeSent = true;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
