import { AlertColor } from '@mui/material';
import { Dispatch } from 'redux';
import * as stageConstants from 'src/redux/constants/stageConstants';
import { IStage } from '../reducers/stageReducer';

export const setStageByName = (stage: string, type?: AlertColor, message?: string, messageParams?: Record<string, string>, canClear?: boolean) => {
    return (dispatch: Dispatch) => dispatch({
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
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.SET_STAGE,
        payload: stage,
    });
};

export const removeStage = (stage: string) => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.REMOVE_STAGE,
        payload: { name: stage },
    });
};

export const removeStagesMany = (stages: Array<string>) => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.REMOVE_STAGES_MANY,
        payload: stages,
    });
};

export const clearStage = () => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.CLEAR_ALL_STAGE,
    });
};

export const dangerouslyClearStage = () => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.DANGEROUSLY_CLEAR_ALL_STAGE,
    });
};
