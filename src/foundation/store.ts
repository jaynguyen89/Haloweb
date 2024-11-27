import { applyMiddleware, compose, legacy_createStore as createStore, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { StorageKeys } from 'src/commons/enums';
import reducers from 'src/redux/reducers';
import * as authenticationConstants from 'src/redux/constants/authenticationConstants';

const setLocalStorageData = () => (next: (action: AnyAction) => void) => (action: AnyAction): void => {
    if (action.type === authenticationConstants.LOGIN_SUCCESS)
        localStorage.setItem(StorageKeys.AUTHORIZATION, JSON.stringify(action.payload));

    if (action.type === authenticationConstants.AUTHENTICATION_VOID)
        localStorage.clear();

    next(action);
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const composeEnhancer = (
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const enhancer = composeEnhancer(applyMiddleware(thunk, setLocalStorageData));

const store = createStore(reducers, enhancer);

export default store;
