import { useState, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { IAuthenticatedUser } from 'src/models/Authentication';
import { TRootState } from 'src/redux/reducers';
import Roles from 'src/models/enums/roles';
import { sendRequestToGetAuthenticatedUserInfo } from 'src/redux/actions/accountActions';
import { surrogate } from 'src/utilities/otherUtilities';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { StorageKeys } from 'src/commons/enums';

type TUseAuthorizationReturnProps = {
    accountId: string,
    profileId: string,
    username: string,
    roles: Array<Roles>,
    fullName?: string,
    bearerToken: string,
    authorizationToken: string,
    refreshToken: string,
    authorizedTimestamp: number,
    validityDuration: number,
    twoFactorConfirmed: boolean | null,
};

const useAuthorization = (): TUseAuthorizationReturnProps => {
    const dispatch = useDispatch();
    const authorization = useSelector((state: TRootState) => state.authenticationStore.authorization);
    const [authenticatedUser, setAuthenticatedUser] = useState<IAuthenticatedUser | null>(null);

    useEffect(() => {
        const storedAuthenticatedUser = localStorage.getItem(StorageKeys.AUTHENTICATED_USER);
        if (Boolean(storedAuthenticatedUser)) {
            setAuthenticatedUser(JSON.parse(storedAuthenticatedUser) as IAuthenticatedUser);
            return;
        }

        if (Boolean(authorization)) {
            surrogate(dispatch, setStageByName(Stages.GET_AUTHENTICATED_USER_INFO_BEGIN));

            sendRequestToGetAuthenticatedUserInfo(dispatch, authorization).then(data => {
                batch(() => {
                    surrogate(dispatch, removeStage(Stages.GET_AUTHENTICATED_USER_INFO_BEGIN));
                    if (Boolean(data)) {
                        setAuthenticatedUser(data);
                        localStorage.setItem(StorageKeys.AUTHENTICATED_USER, JSON.stringify(data));
                    }
                    else surrogate(dispatch, setStageByName(Stages.GET_AUTHENTICATED_USER_INFO_FAILED));
                });
            });
        }
    }, []);

    return {
        ...authorization,
        ...authenticatedUser,
    };
};

export default useAuthorization;