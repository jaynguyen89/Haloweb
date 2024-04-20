import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';

const mockStore = configureStore([]);
const store = mockStore({
    /* mock any redux data */
});

export const withStoreMock = (component: React.ReactElement) => {
    return (
        <Provider store={store}>
            {component}
        </Provider>
    );
};
