import { Dispatch } from 'redux';
import { IAuthorization } from 'src/models/Authentication';
import { IOccupationItem } from 'src/models/Occupation';
import { isSuccessStatusCode, readLocalStorage, setLocalStorage } from 'src/utilities/otherUtilities';
import { ControllerEndpoints, RequestMethods, StorageKeys } from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';

export const sendRequestToGetOccupationItems = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
): Promise<Array<IOccupationItem> | null | undefined> => {
    const data = readLocalStorage<Array<IOccupationItem>>(StorageKeys.OCCUPATION_ITEMS);
    if (data) return data;

    const request = new RequestBuilder<Array<IOccupationItem>>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.OCCUPATION}/list`)
        .build(authorization);

    const response = await request.send(dispatch);

    const isSuccess = response && isSuccessStatusCode(response.status);
    if (isSuccess) {
        setLocalStorage(StorageKeys.OCCUPATION_ITEMS, response?.data);
        return response?.data;
    }

    return null;
};

export const sendRequestToGetOccupations = async (
    dispatch: Dispatch,
    authorization: IAuthorization,
): Promise<Array<IOccupationItem> | null | undefined> => {
    const data = readLocalStorage<Array<IOccupationItem>>(StorageKeys.OCCUPATIONS);
    if (data) return data;

    const request = new RequestBuilder<Array<IOccupationItem>>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.OCCUPATION}/all`)
        .build(authorization);

    const response = await request.send(dispatch);

    const isSuccess = response && isSuccessStatusCode(response.status);
    if (isSuccess) {
        setLocalStorage(StorageKeys.OCCUPATIONS, response?.data);
        return response?.data;
    }

    return null;
};