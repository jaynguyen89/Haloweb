import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { isSuccessStatusCode, surrogate } from 'src/utilities/otherUtilities';
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