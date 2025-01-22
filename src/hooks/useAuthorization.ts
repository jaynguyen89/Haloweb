import { useState, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { IAuthorization, IAuthenticatedUser } from 'src/models/Authentication';
import { TRootState } from 'src/redux/reducers';
import { sendRequestToGetAuthenticatedUserInfo } from 'src/redux/actions/accountActions';
import { readLocalStorage, setLocalStorage, surrogate } from 'src/utilities/otherUtilities';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { StorageKeys } from 'src/commons/enums';
import { IRegionalizedPhoneNumber } from '../models/Profile';

type TUseAuthorizationReturnProps = {
    authorization: IAuthorization,
    profileId: string,
    username: string,
    fullName?: string,
    emailAddress?: string,
    phoneNumber?: IRegionalizedPhoneNumber,
};

const useAuthorization = (): TUseAuthorizationReturnProps => {
    const dispatch = useDispatch();
    const authorization = useSelector((state: TRootState) => state.authenticationStore.authorization);
    const [authenticatedUser, setAuthenticatedUser] = useState<IAuthenticatedUser | null>(null);

    useEffect(() => {
        const authenticatedUser = readLocalStorage<IAuthenticatedUser>(StorageKeys.AUTHENTICATED_USER);
        if (Boolean(authenticatedUser)) {
            setAuthenticatedUser(authenticatedUser);
            return;
        }

        if (Boolean(authorization)) {
            surrogate(dispatch, setStageByName(Stages.GET_AUTHENTICATED_USER_INFO_BEGIN));

            sendRequestToGetAuthenticatedUserInfo(dispatch, authorization).then(data => {
                batch(() => {
                    surrogate(dispatch, removeStage(Stages.GET_AUTHENTICATED_USER_INFO_BEGIN));
                    if (Boolean(data)) {
                        setAuthenticatedUser(data);
                        setLocalStorage(StorageKeys.AUTHENTICATED_USER, data);
                    }
                    else surrogate(dispatch, setStageByName(Stages.GET_AUTHENTICATED_USER_INFO_FAILED));
                });
            });
        }
    }, []);

    return {
        authorization,
        ...authenticatedUser,
    };
};

export default useAuthorization;