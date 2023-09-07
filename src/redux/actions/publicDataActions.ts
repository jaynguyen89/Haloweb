import { Dispatch } from 'redux';
import configs from 'src/commons/configs';
import { ControllerEndpoints, RequestMethods } from 'src/commons/enums';
import requestInterceptors from 'src/fetcher/interceptors/RequestInterceptors';
import responseInterceptors from 'src/fetcher/interceptors/ResponseInterceptors';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import RequestOption from 'src/fetcher/RequestOption';
import IPublicData from 'src/models/PublicData';
import * as publicDataConstants from 'src/redux/constants/publicDataConstants';

export const prefetchPublicDataOnLaunch = () => {
    const request = new RequestBuilder<IPublicData>()
        .withMethod(RequestMethods.GET)
        .withEndpoint(`${ControllerEndpoints.PUBLIC_DATA}/enums`)
        .withRequestInterceptors(requestInterceptors)
        .withResponseInterceptors(responseInterceptors)
        .withOptions(new RequestOption(false))
        .build();

    return async (dispatch: Dispatch) => {
        const publicData = await request.send(dispatch, configs.requestShouldRetryOnFailure ? capturePublicDataResponseOnRetry : undefined);
        dispatch({
            type: publicDataConstants.PREFETCH_PUBLIC_DATA_ON_LAUNCH,
            payload: publicData,
        });
    };
};

const capturePublicDataResponseOnRetry = (dispatch: Dispatch, publicData: IPublicData) => dispatch({
        type: publicDataConstants.PREFETCH_PUBLIC_DATA_ON_LAUNCH,
        payload: publicData,
    });
