import produce from 'immer';
import { AnyAction } from 'redux';
import * as interestConstants from 'src/redux/constants/interestConstants';
import { IInterest } from 'src/models/Interest';

interface IInterestStore {
    profileInterests: Array<IInterest | string>,
}

const initialState: IInterestStore = {
    profileInterests: [],
};

const reducer = produce((state: IInterestStore, action: AnyAction) => {
    switch (action.type) {
        case interestConstants.GET_PROFILE_INTERESTS_SUCCESS:
            state.profileInterests = action.payload;
            break;
        case interestConstants.GET_PROFILE_INTERESTS_FAILED:
            state.profileInterests = [];
            break;
        default:
            return;
    }
}, initialState);

export default reducer;
