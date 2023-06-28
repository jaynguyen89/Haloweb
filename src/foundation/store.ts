import { applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../redux/allReducers';
import authenticationConstants from '../redux/constants/authenticationConstants';

const loadLocalStorageData = () => (next: any) => (action: any) => {
    // if (action.type === authenticationConstants.AUTHENTICATED) {
    //     localStorage.setItem('authToken', action.payload.authToken);
    //     localStorage.setItem('userId', action.payload.userId);
    //     localStorage.setItem('role', action.payload.role);
    // }

    if (action.type === authenticationConstants.AUTHENTICATION_VOID) localStorage.clear();
    next(action);
}

const composeEnhancer = (
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const enhancer = composeEnhancer(applyMiddleware(thunk, loadLocalStorageData));

const store = createStore(reducers, enhancer);

export default store;
