import { AlertColor } from '@mui/material';
import { Dispatch } from 'redux';
import * as stageConstants from 'src/redux/constants/stageConstants';
import { IStage } from '../reducers/stageReducer';
import { surrogate } from 'src/utilities/otherUtilities';
import { ISiteWideMessage } from 'src/commons/interfaces';

export const setStageByName = (stage: string, type?: AlertColor, message?: string, messageParams?: Record<string, string>, canClear?: boolean) => {
    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: stageConstants.SET_STAGE,
        payload: {
            name: stage,
            type,
            message,
            messageParams,
            canClear: canClear === undefined ? true : canClear,
        } as IStage,
    });
};

export const setStage = (stage: IStage) => {
    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: stageConstants.SET_STAGE,
        payload: stage,
    });
};

export const removeStage = (stage: string) => {
    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: stageConstants.REMOVE_STAGE,
        payload: { name: stage },
    });
};

export const removeStagesMany = (stages: Array<string>) => {
    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: stageConstants.REMOVE_STAGES_MANY,
        payload: stages,
    });
};

export const clearStage = () => {
    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: stageConstants.CLEAR_ALL_STAGE,
    });
};

export const dangerouslyClearStage = () => {
    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: stageConstants.DANGEROUSLY_CLEAR_ALL_STAGE,
    });
};

export const setSiteWideMessage = (message: ISiteWideMessage) => {
    return (dispatch: Dispatch) => surrogate(dispatch, {
        type: stageConstants.SET_SITEWIDE_MESSAGE,
        payload: message,
    });
};

// Get message from LocalStorage and also remove it
export const removeSiteWideMessage = () => (dispatch: Dispatch) =>
    surrogate(dispatch, {
        type: stageConstants.REMOVE_SITEWIDE_MESSAGE,
    });
