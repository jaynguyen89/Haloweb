import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { createInterceptors, isSuccessStatusCode, surrogate } from 'src/utilities/otherUtilities';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { ControllerEndpoints, RequestHeaderKeys, RequestMethods } from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import { IAddressBook } from 'src/models/AddressBook';
import { IAuthorization } from 'src/models/Authentication';
import * as addressConstants from 'src/redux/constants/addressConstants';
import _cloneDeep from 'lodash/cloneDeep';
import _mapKeys from 'lodash/mapKeys';
import _camelCase from 'lodash/camelCase';
import { IAddressData } from 'src/models/Address';
import { HttpStatusCode } from 'axios';

export const sendRequestToGetAddressBook = (profileId: string, authorization: IAuthorization) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_ADDRESS_BOOK_BEGIN));

    const request = new RequestBuilder<IAddressBook>()
        .withMethod(RequestMethods.GET)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.ADDRESS}/all`)
        .build(authorization);

    const response = await request.send(dispatch);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_ADDRESS_BOOK_BEGIN));
    const isSuccess = response && isSuccessStatusCode(response.status);

    if (isSuccess) {
        let data = JSON.parse(response!.data as unknown as string);

        data = _mapKeys(data, (_, key) => _camelCase(key));
        data.addresses = data.addresses.map(address => _mapKeys(address, (_, key) => _camelCase(key)));

        const fineAddresses = _cloneDeep(data.addresses);
        fineAddresses.forEach(fineAddress => {
            fineAddress.address = _mapKeys(fineAddress.address, (_, key) => _camelCase(key));
            fineAddress.address.country = _mapKeys(fineAddress.address.country, (_, key) => _camelCase(key));
            fineAddress.address.division = _mapKeys(fineAddress.address.division, (_, key) => _camelCase(key));
        });
        data.addresses = fineAddresses;

        surrogate(dispatch, {
            type: addressConstants.GET_ADDRESS_BOOK_SUCCESS,
            payload: data as IAddressBook,
        });
    }
    else batch(() => {
        surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_ADDRESS_BOOK_FAILED));
        surrogate(dispatch, { type: addressConstants.GET_ADDRESS_BOOK_FAILED });
    });
};

export const sendRequestToAddNewAddress = (
    profileId: string,
    addressData: IAddressData,
    authorization: IAuthorization,
) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_ADD_NEW_ADDRESS_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_ADD_NEW_ADDRESS_BAD_REQUEST,
            statusCode: HttpStatusCode.BadRequest,
        },
    ]);

    const request = new RequestBuilder<string>()
        .withMethod(RequestMethods.POST)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.ADDRESS}/add`)
        .withResponseInterceptors(responseInterceptors)
        .withBody(addressData)
        .build(authorization);

    const response = await request.send(dispatch);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_ADD_NEW_ADDRESS_BEGIN));
    const isSuccess = response && isSuccessStatusCode(response.status);

    if (isSuccess) {
        const addressId = response!.data as string;
        surrogate(dispatch, {
            type: addressConstants.ADD_NEW_ADDRESS_SUCCESS,
            payload: addressId,
        });
    }
    else surrogate(dispatch, setStageByName(Stages.REQUEST_TO_ADD_NEW_ADDRESS_FAILED));
};

export const sendRequestToUpdateAddress = (
    profileId: string,
    addressId: string,
    addressData: IAddressData,
    authorization: IAuthorization,
) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_UPDATE_ADDRESS_BEGIN));

    const responseInterceptors = createInterceptors([
        {
            stage: Stages.REQUEST_TO_UPDATE_ADDRESS_BAD_REQUEST,
            statusCode: HttpStatusCode.BadRequest,
        },
    ]);

    const request = new RequestBuilder<string>()
        .withMethod(RequestMethods.PUT)
        .withHeader(RequestHeaderKeys.ProfileId, profileId)
        .withEndpoint(`${ControllerEndpoints.ADDRESS}/update/${addressId}`)
        .withResponseInterceptors(responseInterceptors)
        .withBody(addressData)
        .build(authorization);

    const response = await request.send(dispatch);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_UPDATE_ADDRESS_BEGIN));
    const isSuccess = response && isSuccessStatusCode(response.status);

    if (isSuccess) surrogate(dispatch, { type: addressConstants.UPDATE_ADDRESS_SUCCESS });
    else surrogate(dispatch, setStageByName(Stages.REQUEST_TO_UPDATE_ADDRESS_FAILED));
};