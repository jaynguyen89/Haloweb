import { combineReducers } from 'redux';
import themeStore from 'src/redux/reducers/themeReducer';
import stageStore from 'src/redux/reducers/stageReducer';
import languageStore from 'src/redux/reducers/languageReducer';
import publicDataStore from 'src/redux/reducers/publicDataReducer';

const reducers = combineReducers({
    themeStore,
    stageStore,
    languageStore,
    publicDataStore,
});

export type TRootState = ReturnType<typeof reducers>;

export default reducers;
