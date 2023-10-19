import { Dispatch } from 'redux';
import configs from 'src/commons/configs';
import { ControllerEndpoints, RequestMethods, StorageKeys } from 'src/commons/enums';
import RequestBuilder from 'src/fetcher/RequestBuilder';
import Stages from 'src/models/enums/stage';
import IPublicData from 'src/models/PublicData';
import { setStageByName } from 'src/redux/actions/stageActions';
import * as publicDataConstants from 'src/redux/constants/publicDataConstants';
import { surrogate } from 'src/utilities/otherUtilities';

export const prefetchPublicDataOnLaunch = () => {
    return async (dispatch: Dispatch) => {
        surrogate(dispatch, setStageByName(Stages.PREFETCH_SITE_PUBLIC_DATA_ONGOING));

        const publicDataInStorage = localStorage.getItem(StorageKeys.PUBLIC_DATA);
        let publicData = publicDataInStorage === null ? undefined : JSON.parse(publicDataInStorage) as IPublicData;
        if (!publicData) {
            const request = new RequestBuilder<IPublicData>()
                .withMethod(RequestMethods.GET)
                .withEndpoint(`${ControllerEndpoints.PUBLIC_DATA}/enums`)
                .build();

            const result = await request.send(dispatch, configs.requestShouldRetryOnFailure ? capturePublicDataResponseOnRetry : undefined);
            publicData = result?.data as IPublicData | undefined;
        }

        if (publicData) dispatchPublicDataAndSetStorage(dispatch, publicData, publicDataInStorage === null);
    };
};

const capturePublicDataResponseOnRetry = (dispatch: Dispatch, publicData: IPublicData) => {
    if (publicData) dispatchPublicDataAndSetStorage(dispatch, publicData);
};

const dispatchPublicDataAndSetStorage = (dispatch: Dispatch, publicData: IPublicData, setStorage: boolean = true) => {
    if (setStorage) localStorage.setItem(StorageKeys.PUBLIC_DATA, JSON.stringify(publicData));

    surrogate(dispatch, {
        type: publicDataConstants.PREFETCH_PUBLIC_DATA_ON_LAUNCH,
        payload: publicData,
    });
};
