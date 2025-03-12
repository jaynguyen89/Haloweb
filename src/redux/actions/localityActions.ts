import { Dispatch } from 'redux';
import { surrogate } from 'src/utilities/otherUtilities';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { ControllerEndpoints, RequestMethods } from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import { ILocality } from 'src/models/Locality';
import { IAuthorization } from 'src/models/Authentication';

export const sendRequestToGetLocalityData = (authorization: IAuthorization) => async (dispatch: Dispatch) => {
    surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_LOCALITY_DATA_BEGIN));

    const request = new RequestBuilder<ILocality>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.LOCALITY}/localities`)
        .build(authorization);

    const response = await request.send(dispatch);

    surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_LOCALITY_DATA_BEGIN));

};