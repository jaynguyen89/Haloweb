import IPublicData from 'src/models/PublicData';
import * as publicDataConstants from 'src/redux/constants/publicDataConstants';
import produce from 'immer';
import { AnyAction } from 'redux';

interface IPublicDataStore {
    publicData: IPublicData,
}

const initialState: IPublicDataStore = {
    publicData: {
        environment: '',
        enableSecretCode: false,
        secretCodeLength: 0,
        dateFormats: [],
        timeFormats: [],
        numberFormats: [],
        genders: [],
        languages: [],
        themes: [],
        nameFormats: [],
        birthFormats: [],
        unitSystems: [],
        careerFormats: [],
        visibilityFormats: [],
        countries: [],
    },
};

const reducer = produce((state: IPublicDataStore, action: AnyAction) => {
    switch (action.type) {
        case publicDataConstants.PREFETCH_PUBLIC_DATA_ON_LAUNCH:
            state.publicData = action.payload;
            return;
        default:
            return;
    }
}, initialState);

export default reducer;
