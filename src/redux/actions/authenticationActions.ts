import { Dispatch } from 'redux';
import { StorageKeys } from 'src/models/enums/account';
import IAuthenticatedUser from 'src/models/AuthenticatedUser';
import * as authenticationConstants from 'src/redux/constants/authenticationConstants';

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
