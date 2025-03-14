import produce from 'immer';
import { AnyAction } from 'redux';
import { ILocality } from 'src/models/Locality';
import * as localityConstants from 'src/redux/constants/localityConstants';

interface ILocalityStore {
    localities: Array<ILocality>,
}

const initialState: ILocalityStore = {
    localities: [],
};

const reducer = produce((state: ILocalityStore, action: AnyAction) => {
    switch (action.type) {
        case localityConstants.GET_LOCALITY_DATA_SUCCESS:
            state.localities = action.payload;
            break;
        case localityConstants.GET_LOCALITY_DATA_FAILED:
            state.localities = [];
            break;
        default:
            return;
    }
}, initialState);

export default reducer;