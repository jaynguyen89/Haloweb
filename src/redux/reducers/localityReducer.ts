import produce from 'immer';
import { AnyAction } from 'redux';
import * as localityConstants from 'src/redux/constants/localityConstants';

interface ILocalityStore {
    locality: ILocality | null,
}

const initialState: ILocalityStore = {
    locality: null,
};

const reducer = produce((state: ILocalityStore, action: AnyAction) => {
    switch (action.type) {
        case localityConstants.GET_LOCALITY_DATA_SUCCESS:
            state.locality = action.payload;
            break;
        case localityConstants.GET_LOCALITY_DATA_FAILED:
            state.locality = null;
            break;
        default:
            return;
    }
}, initialState);

export default reducer;