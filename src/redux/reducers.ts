import { combineReducers } from 'redux';
import themeStore from 'src/redux/reducers/themeReducer';
import stageStore from 'src/redux/reducers/stageReducer';
import languageStore from 'src/redux/reducers/languageReducer';
import publicDataStore from 'src/redux/reducers/publicDataReducer';
import authenticationStore from 'src/redux/reducers/authenticationReducer';
import accountStore from 'src/redux/reducers/accountReducer';

const reducers = combineReducers({
    themeStore,
    stageStore,
    languageStore,
    publicDataStore,
    authenticationStore,
    accountStore,
});

export type TRootState = ReturnType<typeof reducers>;

export default reducers;
