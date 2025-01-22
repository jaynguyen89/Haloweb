import { batch, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IOccupationItem } from 'src/models/Occupation';
import { surrogate } from 'src/utilities/otherUtilities';
import { TRootState } from 'src/redux/reducers';
import { removeStage, setStageByName } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';
import { sendRequestToGetOccupationItems } from 'src/redux/actions/occupationActions';

export const useOccupationItems = () => {
    const dispatch = useDispatch();
    const authorization = useSelector((state: TRootState) => state.authenticationStore.authorization);
    const [occupations, setOccupations] = useState<Array<IOccupationItem>>([]);

    useEffect(() => {
        if (Boolean(authorization)) {
            surrogate(dispatch, setStageByName(Stages.GET_OCCUPATION_ITEMS_BEGIN));

            sendRequestToGetOccupationItems(dispatch, authorization).then(data => {
                batch(() => {
                    surrogate(dispatch, removeStage(Stages.GET_OCCUPATION_ITEMS_BEGIN));
                    if (Boolean(data)) setOccupations(data);
                    else surrogate(dispatch, setStageByName(Stages.GET_OCCUPATION_ITEMS_FAILED));
                });
            });
        }
    }, []);

    return occupations;
};

export const useOccupations = () => {
    const dispatch = useDispatch();
    const authorization = useSelector((state: TRootState) => state.authenticationStore.authorization);
    const [occupations, setOccupations] = useState<Array<IOccupationItem>>([]);

    useEffect(() => {
        if (Boolean(authorization)) {
            surrogate(dispatch, setStageByName(Stages.GET_OCCUPATIONS_BEGIN));

            sendRequestToGetOccupations(dispatch, authorization).then(data => {
                batch(() => {
                    surrogate(dispatch, removeStage(Stages.GET_OCCUPATIONS_BEGIN));
                    if (Boolean(data)) setOccupations(data);
                    else surrogate(dispatch, setStageByName(Stages.GET_OCCUPATIONS_FAILED));
                });
            });
        }
    }, []);

    return occupations;
};