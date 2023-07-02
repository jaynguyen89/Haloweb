import { combineReducers } from 'redux';
import themeStore from './reducers/themeReducer';
import stageStore from './reducers/stageReducer';

const reducers = combineReducers({
    themeStore,
    stageStore,
});

export type TRootState = ReturnType<typeof reducers>;

export default reducers;
