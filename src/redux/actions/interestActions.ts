import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { IAuthorization } from 'src/models/Authentication';
import { IInterest, IInterestItem } from 'src/models/Interest';
import { isSuccessStatusCode, surrogate } from 'src/utilities/otherUtilities';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { ControllerEndpoints, RequestHeaderKeys, RequestMethods } from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import * as interestConstants from 'src/redux/constants/interestConstants';

export const sendRequestToGetProfileInterests = (
    authorization: IAuthorization,
    profileId: string,
    simplified: boolean,
) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_PROFILE_INTERESTS_BEGIN));

    const request = new RequestBuilder<Array<IInterest | string>>()
        .withMethod(RequestMethods.GET)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.INTEREST}/profile-interests/${simplified ? 1 : 0}`)
        .build(authorization);

    const response = await request.send(dispatch);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_PROFILE_INTERESTS_BEGIN));
    const isSuccess = response && isSuccessStatusCode(response.status);

    if (isSuccess) surrogate(dispatch, {
            type: interestConstants.GET_PROFILE_INTERESTS_SUCCESS,
            payload: response!.data as Array<IInterest | string>,
        });
    else
        batch(() => {
            surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_PROFILE_INTERESTS_FAILED));
            surrogate(dispatch, { type: interestConstants.GET_PROFILE_INTERESTS_FAILED });
        });
};

export const sendRequestToGetInterestItems = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
): Promise<Array<IInterestItem>> => {
    const request = new RequestBuilder<Array<IInterestItem>>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.INTEREST}/list`)
        .build(authorization);

    const response = await request.send(dispatch);
    const isSuccess = response && isSuccessStatusCode(response.status);

    if (isSuccess) return response!.data as Array<IInterestItem>;
    return [];
};

export const sendRequestToGetInterests = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
): Promise<Array<IInterest>> => {
    const request = new RequestBuilder<Array<IInterest>>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.INTEREST}/all`)
        .build(authorization);

    const response = await request.send(dispatch);
    const isSuccess = response && isSuccessStatusCode(response.status);

    if (isSuccess) return response!.data as Array<IInterest>;
    return [];
};