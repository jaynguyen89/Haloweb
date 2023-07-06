import { Dispatch } from 'redux';
import * as stageConstants from 'src/redux/constants/stageConstants';

export const setStage = (stage: string) => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.SET_STAGE,
        payload: stage,
    });
};

export const removeStage = (stage: string) => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.REMOVE_STAGE,
        payload: stage,
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
