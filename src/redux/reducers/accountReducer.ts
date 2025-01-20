import produce from 'immer';
import { AnyAction } from 'redux';
import * as accountConstants from 'src/redux/constants/accountConstants';

interface IAccountStore {

}

const initialState: IAccountStore = {
    authenticatedUser: null,
};

const reducer = produce((state: IAccountStore, action: AnyAction) => {
    switch (action.type) {
        default:
            return;
    }
}, initialState);

export default reducer;
