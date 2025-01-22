import { combineReducers } from 'redux';
import themeStore from 'src/redux/reducers/themeReducer';
import stageStore from 'src/redux/reducers/stageReducer';
import languageStore from 'src/redux/reducers/languageReducer';
import publicDataStore from 'src/redux/reducers/publicDataReducer';
import authenticationStore from 'src/redux/reducers/authenticationReducer';
import accountStore from 'src/redux/reducers/accountReducer';
import profileStore from 'src/redux/reducers/profileReducer';
import occupationStore from 'src/redux/reducers/occupationReducer';

const reducers = combineReducers({
    themeStore,
    stageStore,
    languageStore,
    publicDataStore,
    authenticationStore,
    accountStore,
    profileStore,
    occupationStore,
});

export type TRootState = ReturnType<typeof reducers>;

export default reducers;
