import { AlertColor } from '@mui/material';
import produce from 'immer';
import * as stageConstants from 'src/redux/constants/stageConstants';
import { AnyAction } from 'redux';
import _remove from 'lodash/remove';

export interface IStage {
    name: string,
    type?: AlertColor,
    message?: string,
    messageParams?: Record<string, string>,
    canClear?: boolean,
}

export interface IStageStore {
    stages: Array<IStage>;
}

const initialState: IStageStore = {
    stages: new Array<IStage>(),
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
            _remove(state.stages, { canClear: true });
            return;
        case stageConstants.DANGEROUSLY_CLEAR_ALL_STAGE:
            state.stages = new Array<IStage>();
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
