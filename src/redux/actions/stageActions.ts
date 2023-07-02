import { AnyAction, Dispatch } from 'redux';
import * as stageConstants from '../constants/stageConstants';

export const setStage = (stage: string): AnyAction => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.SET_STAGE,
        payload: stage,
    });
};

export const removeStage = (stage: string): AnyAction => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.REMOVE_STAGE,
        payload: stage,
    });
};

export const removeStagesMany = (stages: Array<string>): AnyAction => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.REMOVE_STAGES_MANY,
        payload: stages,
    });
};

export const clearStage = (): AnyAction => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.CLEAR_ALL_STAGE,
    });
};
