import { Dispatch } from 'redux';
import { IErrorCodeData } from 'src/commons/interfaces';
import * as stageConstants from 'src/redux/constants/stageConstants';
import { IStage } from '../reducers/stageReducer';

export const setStageByName = (stage: string, code?: string, message?: string) => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.SET_STAGE,
        payload: {
            name: stage,
            code,
            message,
            canClear: true,
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

export const setErrorData = (data: object) => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.SET_ERROR_DATA,
        payload: data,
    });
};

export const removeErrorData = () => {
    return (dispatch: Dispatch) => dispatch({
        type: stageConstants.REMOVE_ERROR_DATA,
    });
};
