import * as authenticationConstants from 'src/redux/constants/authenticationConstants';
import produce from 'immer';
import { AnyAction } from 'redux';
import { IAuthenticatedUser } from 'src/models/Authentication';

interface IAuthenticationStore {
    authenticatedUser: IAuthenticatedUser | null,
    accountActivation: {
        isSecretCodeSent: boolean,
        activationSuccess: boolean,
        activationError?: object,
    },
    accountRegistration: {
        success: boolean,
        error?: object,
    },
}

const initialState: IAuthenticationStore = {
    authenticatedUser: null,
    accountActivation: {
        isSecretCodeSent: false,
        activationSuccess: false,
        activationError: undefined,
    },
    accountRegistration: {
        success: false,
        error: undefined,
    },
};

const reducer = produce((state: IAuthenticationStore, action: AnyAction) => {
    switch (action.type) {
        case authenticationConstants.INITIALIZE_AUTH_ON_LAUNCH:
        case authenticationConstants.AUTHENTICATED:
            state.authenticatedUser = action.payload;
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
        case authenticationConstants.AUTHENTICATION_VOID:
            state.authenticatedUser = null;
            return;
        case authenticationConstants.ACTIVATE_ACCOUNT_SECRET_CODE_SENT:
            state.accountActivation.isSecretCodeSent = true;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
