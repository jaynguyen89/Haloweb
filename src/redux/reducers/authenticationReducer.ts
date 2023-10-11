import * as authenticationConstants from 'src/redux/constants/authenticationConstants';
import produce from 'immer';
import { AnyAction } from 'redux';
import IAuthenticatedUser from 'src/models/AuthenticatedUser';

interface IAuthenticationStore {
    authenticatedUser: IAuthenticatedUser | null,
    accountActivation: {
        isSecretCodeSent: boolean,
    },
}

const initialState: IAuthenticationStore = {
    authenticatedUser: null,
    accountActivation: {
        isSecretCodeSent: false,
    },
};

const reducer = produce((state: IAuthenticationStore, action: AnyAction) => {
    switch (action.type) {
        case authenticationConstants.INITIALIZE_AUTH_ON_LAUNCH:
        case authenticationConstants.AUTHENTICATED:
            state.authenticatedUser = action.payload;
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
