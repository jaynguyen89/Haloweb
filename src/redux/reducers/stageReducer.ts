import produce from 'immer';
import * as stageConstants from 'src/redux/constants/stageConstants';
import { AnyAction } from 'redux';
import _remove from 'lodash/remove';

export interface IStage {
    name: string,
    code?: string,
    message?: string,
    canClear?: boolean,
}

export interface IStageStore {
    stages: Array<IStage>;
    errorData: object | null,
}

const initialState: IStageStore = {
    stages: new Array<IStage>(),
    errorData: null,
};

const reducer = produce((state: IStageStore, action: AnyAction) => {
    switch (action.type) {
        case stageConstants.SET_STAGE:
            if (state.stages.every(stage => stage.name !== action.payload.name))
                state.stages.push(action.payload);
            return;
        case stageConstants.REMOVE_STAGE:
            _remove(state.stages, (stage) => action.payload.name === stage.name);
            return;
        case stageConstants.REMOVE_STAGES_MANY:
            _remove(
                state.stages,
                (stage) =>
                    (action.payload as Array<string>).some(payload => payload === stage.name),
            );
            return;
        case stageConstants.CLEAR_ALL_STAGE:
            _remove(state.stages, (stage) => stage.canClear);
            return;
        case stageConstants.DANGEROUSLY_CLEAR_ALL_STAGE:
            state.stages = new Array<IStage>();
            return;
        case stageConstants.SET_ERROR_DATA:
            state.errorData = action.payload;
            return;
        case stageConstants.REMOVE_ERROR_DATA:
            state.errorData = null;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
