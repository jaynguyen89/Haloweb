import { combineReducers } from 'redux';
import themeStore from 'src/redux/reducers/themeReducer';
import stageStore from 'src/redux/reducers/stageReducer';
import languageStore from 'src/redux/reducers/languageReducer';
import publicDataStore from 'src/redux/reducers/publicDataReducer';
import authenticationStore from 'src/redux/reducers/authenticationReducer';
import accountStore from 'src/redux/reducers/accountReducer';
import profileStore from 'src/redux/reducers/profileReducer';
import occupationStore from 'src/redux/reducers/occupationReducer';
import interestStore from 'src/redux/reducers/interestReducer';
import addressStore from 'src/redux/reducers/addressReducer';

const reducers = combineReducers({
    themeStore,
    stageStore,
    languageStore,
    publicDataStore,
    authenticationStore,
    accountStore,
    profileStore,
    occupationStore,
    interestStore,
    addressStore,
});

export type TRootState = ReturnType<typeof reducers>;

export default reducers;
