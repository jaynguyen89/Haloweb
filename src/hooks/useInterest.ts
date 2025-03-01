import { batch, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IInterest, IInterestItem } from 'src/models/Interest';
import { readLocalStorage, setLocalStorage, surrogate } from 'src/utilities/otherUtilities';
import { StorageKeys } from 'src/commons/enums';
import { TRootState } from 'src/redux/reducers';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { sendRequestToGetInterestItems, sendRequestToGetInterests } from 'src/redux/actions/interestActions';

export const useInterestItems = (): Array<IInterestItem> => {
    const dispatch = useDispatch();
    const authorization = useSelector((state: TRootState) => state.authenticationStore.authorization);
    const [interestItems, setInterestItems] = useState<Array<IInterestItem>>([]);

    useEffect(() => {
        const data = readLocalStorage<Array<IInterestItem>>(StorageKeys.INTEREST_ITEMS);
        if (data) {
            setInterestItems(interestItems);
            return;
        }

        if (Boolean(authorization)) {
            surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_INTEREST_ITEMS_BEGIN));

            sendRequestToGetInterestItems(dispatch, authorization).then(data => {
                batch(() => {
                    surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_INTEREST_ITEMS_BEGIN));
                    if (data.length) {
                        setInterestItems(data);
                        setLocalStorage(StorageKeys.INTEREST_ITEMS, data);
                    }
                    else surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_INTEREST_ITEMS_FAILED));
                });
            });
        }
    }, []);

    return interestItems;
};

export const useInterests = (): Array<IInterest> => {
    const dispatch = useDispatch();
    const authorization = useSelector((state: TRootState) => state.authenticationStore.authorization);
    const [interests, setInterests] = useState<Array<IInterest>>([]);

    useEffect(() => {
        surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_INTERESTS_BEGIN));

        sendRequestToGetInterests(dispatch, authorization).then(data => {
            batch(() => {
                surrogate(dispatch, removeStage(Stages.REQUEST_TO_GET_INTERESTS_BEGIN));
                if (data.length) {
                    setInterests(data);
                    setLocalStorage(StorageKeys.INTERESTS, data);
                }
                else surrogate(dispatch, setStageByName(Stages.REQUEST_TO_GET_INTERESTS_FAILED));
            });
        });
    }, []);

    return interests;
};