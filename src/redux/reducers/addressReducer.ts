import produce from 'immer';
import { AnyAction } from 'redux';
import * as addressConstants from 'src/redux/constants/addressConstants';
import { IAddressBook } from 'src/models/AddressBook';

interface IAddressStore {
    addressBook: IAddressBook | null,
}

const initialState: IAddressStore = {
    addressBook: null,
};

const reducer = produce((state: IAddressStore, action: AnyAction) => {
    switch (action.type) {
        case addressConstants.GET_ADDRESS_BOOK_SUCCESS:
            state.addressBook = action.payload;
            break;
        case addressConstants.GET_ADDRESS_BOOK_FAILED:
            state.addressBook = null;
            break;
        default:
            return;
    }
}, initialState);

export default reducer;