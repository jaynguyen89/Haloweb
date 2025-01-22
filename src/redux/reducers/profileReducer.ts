import produce from 'immer';
import { AnyAction } from 'redux';
import * as profileConstants from 'src/redux/constants/profileConstants';

interface IProfileStore {

}

const initialState: IProfileStore = {

};

const reducer = produce((state: IProfileStore, action: AnyAction) => {
    switch (action.type) {
        default:
            return;
    }
}, initialState);

export default reducer;
