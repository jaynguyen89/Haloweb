import { combineReducers } from 'redux';
import themeStore from 'src/redux/reducers/themeReducer';
import stageStore from 'src/redux/reducers/stageReducer';
import languageStore from 'src/redux/reducers/languageReducer';

const reducers = combineReducers({
    themeStore,
    stageStore,
    languageStore,
});

export type TRootState = ReturnType<typeof reducers>;

export default reducers;
