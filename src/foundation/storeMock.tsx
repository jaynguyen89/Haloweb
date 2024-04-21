import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { publicDataMock } from 'src/models/PublicData';

const mockStore = configureStore([]);
const storeMock = mockStore({
    languageStore: {
        siteLanguage: {
            selected: 'en',
            detected: 'en',
        },
    },
    publicDataStore: {
        publicData: publicDataMock,
    },
});

export const withStoreMock = (component: React.ReactElement) => {
    return (
        <Provider store={storeMock}>
            {component}
        </Provider>
    );
};
