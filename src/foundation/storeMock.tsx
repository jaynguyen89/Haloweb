import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import { publicDataMock } from 'src/models/PublicData';

export const stageMock = {
    stages: [
        { name: 'LOADING_TEST' },
        {
            name: 'SHOW_FLASHER_SERVER_ERROR',
            type: 'error',
            message: 'This is server error test.',
        },
        {
            name: 'STAGE_FLASHER_TEST',
            message: '{{what}} Test',
            messageParams: { what: 'StageFlasher' },
            type: 'success',
        },
    ],
};

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
    stageStore: stageMock,
});

export const withStoreMock = (component: React.ReactElement) => {
    return (
        <Provider store={storeMock}>
            {component}
        </Provider>
    );
};
