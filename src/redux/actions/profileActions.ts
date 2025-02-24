import { Dispatch } from 'redux';
import { IAuthorization } from 'src/models/Authentication';
import { IProfileDetails, IProfileUpdateData } from 'src/models/Profile';
import {
    createInterceptors,
    isSuccessStatusCode,
    readLocalStorage,
    removeLocalStorage,
    setLocalStorage,
    surrogate,
} from 'src/utilities/otherUtilities';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import { ControllerEndpoints, RequestHeaderKeys, RequestMethods, StorageKeys } from 'src/commons/enums';
import Stages from 'src/models/enums/stage';
import { HttpStatusCode } from 'axios';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';

export const sendRequestToGetProfileDetails = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
    profileId: string,
): Promise<IProfileDetails | null | undefined> => {
    const data = readLocalStorage<IProfileDetails>(StorageKeys.PROFILE_DETAILS);
    if (data) return data;

    const request = new RequestBuilder<IProfileDetails>()
        .withMethod(RequestMethods.GET)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.PROFILE}/details`)
        .build(authorization);

    const response = await request.send(dispatch);

    const isSuccess = response && isSuccessStatusCode(response.status);
    if (isSuccess) {
        setLocalStorage(StorageKeys.PROFILE_DETAILS, response?.data as object);
        return response?.data as IProfileDetails;
    }

    return null;
};

export const sendRequestToUpdateProfileDetails = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
    profileId: string,
    data: IProfileUpdateData,
): Promise<boolean | string> => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_UPDATE_PROFILE_INFO_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_UPDATE_PROFILE_FAILED,
            statusCode: HttpStatusCode.BadRequest,
        },
    ]);

    const request = new RequestBuilder<boolean>()
        .withMethod(RequestMethods.PUT)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.PROFILE}/update`)
        .withResponseInterceptors(responseInterceptors)
        .withBody(data)
        .build(authorization);

    const response = await request.send(dispatch);

    const isSuccess = response && isSuccessStatusCode(response.status);
    surrogate(dispatch, removeStage(Stages.REQUEST_TO_UPDATE_PROFILE_INFO_BEGIN));

    if (isSuccess) {
        removeLocalStorage(StorageKeys.PROFILE_DETAILS);
        return true;
    }

    return (response?.data as object)?.fieldName;
};

export const sendRequestToChangeAvatar = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
    profileId: string,
    avatarFile: File,
): Promise<boolean | string> => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_CHANGE_AVATAR_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_CHANGE_AVATAR_FAILED,
            statusCode: HttpStatusCode.BadRequest,
        },
        {
            stage: Stages.REQUEST_TO_CHANGE_AVATAR_FAILED,
            statusCode: HttpStatusCode.Gone,
        },
        {
            stage: Stages.REQUEST_TO_CHANGE_AVATAR_FAILED,
            statusCode: HttpStatusCode.Conflict,
        },
    ]);

    const request = new RequestBuilder<string>()
        .withMethod(RequestMethods.POST)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.PROFILE}/save-profile-photo`)
        .withResponseInterceptors(responseInterceptors)
        .withFormPart('photo', avatarFile)
        .withBodyPart('isAvatar', 'true')
        .build(authorization);

    const response = await request.send(dispatch);

    const isSuccess = response && isSuccessStatusCode(response.status);
    surrogate(dispatch, removeStage(Stages.REQUEST_TO_CHANGE_AVATAR_BEGIN));

    if (isSuccess) {
        removeLocalStorage(StorageKeys.PROFILE_DETAILS);
        return response?.data as string;
    }

    return false;
};

export const sendRequestToRemoveAvatar = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
    profileId: string,
): Promise<boolean | string> => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_REMOVE_AVATAR_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_REMOVE_AVATAR_FAILED,
            statusCode: HttpStatusCode.BadRequest,
        },
    ]);

    const request = new RequestBuilder<string>()
        .withMethod(RequestMethods.POST)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.PROFILE}/delete-profile-photo/1`)
        .withResponseInterceptors(responseInterceptors)
        .build(authorization);

    const response = await request.send(dispatch);

    const isSuccess = response && isSuccessStatusCode(response.status);
    surrogate(dispatch, removeStage(Stages.REQUEST_TO_REMOVE_AVATAR_BEGIN));

    if (isSuccess) {
        removeLocalStorage(StorageKeys.PROFILE_DETAILS);
        return true;
    }

    return false;
};