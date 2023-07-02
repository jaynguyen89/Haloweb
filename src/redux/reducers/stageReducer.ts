import produce from 'immer';
import * as stageConstants from '../constants/stageConstants';
import { AnyAction } from 'redux';
import _remove from 'lodash/remove';

export interface IStageStore {
    stages: Array<string>;
}

const initialState: IStageStore = {
    stages: new Array<string>(),
};

const reducer = produce((state: IStageStore, action: AnyAction) => {
    switch (action.type) {
        case stageConstants.SET_STAGE:
            state.stages.push(action.payload);
            return;
        case stageConstants.REMOVE_STAGE:
            _remove(state.stages, (stage) => action.payload === stage);
            return;
        case stageConstants.REMOVE_STAGES_MANY:
            _remove(state.stages, (stage) => action.payload.includes(stage));
            return;
        case stageConstants.CLEAR_ALL_STAGE:
            state.stages = new Array<string>();
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
