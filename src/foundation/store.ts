import { applyMiddleware, compose, legacy_createStore as createStore, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'src/redux/reducers';
import * as authenticationConstants from 'src/redux/constants/authenticationConstants';

const setLocalStorageData = () => (next: (action: AnyAction) => void) => (action: AnyAction): void => {
    if (action.type === authenticationConstants.AUTHENTICATED) {
        localStorage.setItem('authToken', action.payload.authToken);
        localStorage.setItem('userId', action.payload.userId);
        localStorage.setItem('role', action.payload.role);
    }

    if (action.type === authenticationConstants.AUTHENTICATION_VOID) localStorage.clear();
    next(action);
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const composeEnhancer = (
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const enhancer = composeEnhancer(applyMiddleware(thunk, setLocalStorageData));

const store = createStore(reducers, enhancer);

export default store;
