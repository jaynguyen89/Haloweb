import { HttpStatusCode } from 'axios';
import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import { IAuthenticatedUser, IAuthorization } from 'src/models/Authentication';
import * as accountConstants from 'src/redux/constants/accountConstants';
import { setStageByName, removeStage } from 'src/redux/actions/stageActions';
import { isSuccessStatusCode, surrogate } from 'src/utilities/otherUtilities';
import Stages from 'src/models/enums/stage';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import { ControllerEndpoints, RequestMethods } from 'src/commons/enums';

export const sendRequestToGetAuthenticatedUserInfo = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
): Promise<IAuthenticatedUser | null | undefined> => {
    const request = new RequestBuilder<IAuthenticatedUser>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.ACCOUNT}/get-authenticated-user-info`)
        .build(authorization);

    const response = await request.send(dispatch);
    const isSuccess = response && isSuccessStatusCode(response.status);
    if (isSuccess) return new Promise(() => response?.data);
    else return null;
};
