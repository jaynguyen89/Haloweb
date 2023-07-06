import { combineReducers } from 'redux';
import themeStore from 'src/redux/reducers/themeReducer';
import stageStore from 'src/redux/reducers/stageReducer';

const reducers = combineReducers({
    themeStore,
    stageStore,
});

export type TRootState = ReturnType<typeof reducers>;

export default reducers;
