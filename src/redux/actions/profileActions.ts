import { Dispatch } from 'redux';
import { IAuthorization } from 'src/models/Authentication';
import { IProfileDetails } from 'src/models/Profile';
import { isSuccessStatusCode, readLocalStorage, setLocalStorage } from 'src/utilities/otherUtilities';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import { ControllerEndpoints, RequestHeaderKeys, RequestMethods, StorageKeys } from 'src/commons/enums';

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
        setLocalStorage(StorageKeys.PROFILE_DETAILS, response?.data);
        return response?.data;
    }

    return null;
};