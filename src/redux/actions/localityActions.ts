import { Dispatch } from 'redux';
import { isSuccessStatusCode, readLocalStorage, setLocalStorage, surrogate } from 'src/utilities/otherUtilities';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { ControllerEndpoints, RequestMethods, StorageKeys } from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import { ILocality } from 'src/models/Locality';
import { IAuthorization } from 'src/models/Authentication';
import * as localityConstants from 'src/redux/constants/localityConstants';
import { batch } from 'react-redux';

export const sendRequestToGetLocalityData = (authorization: IAuthorization) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_LOCALITY_DATA_BEGIN));

    const localities = readLocalStorage<Array<ILocality>>(StorageKeys.LOCALITIES);
    if (Boolean(localities)) {
        batch(() => {
            surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_LOCALITY_DATA_BEGIN));
            surrogate(dispatch, {
                type: localityConstants.GET_LOCALITY_DATA_SUCCESS,
                payload: localities,
            });
        });
        return;
    }

    const request = new RequestBuilder<Array<ILocality>>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.LOCALITY}/localities`)
        .build(authorization);

    const response = await request.send(dispatch);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_LOCALITY_DATA_BEGIN));
    const isSuccess = response && isSuccessStatusCode(response.status);

    if (isSuccess) {
        surrogate(dispatch, {
            type: localityConstants.GET_LOCALITY_DATA_SUCCESS,
            payload: response!.data as Array<ILocality>,
        });

        setLocalStorage(StorageKeys.LOCALITIES, response!.data);
    }
    else batch(() => {
        surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_LOCALITY_DATE_FAILED));
        surrogate(dispatch, { type: localityConstants.GET_LOCALITY_DATA_FAILED });
    });
};