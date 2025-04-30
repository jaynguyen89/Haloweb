import produce from 'immer';
import { AnyAction } from 'redux';
import * as addressConstants from 'src/redux/constants/addressConstants';
import { IAddressBook } from 'src/models/AddressBook';

interface IAddressStore {
    addressBook: IAddressBook | null,
    newAddressId: string | null,
    updateAddressSuccess: boolean,
}

const initialState: IAddressStore = {
    addressBook: null,
    newAddressId: null,
    updateAddressSuccess: false,
};

const reducer = produce((state: IAddressStore, action: AnyAction) => {
    switch (action.type) {
        case addressConstants.GET_ADDRESS_BOOK_SUCCESS:
            state.addressBook = action.payload;
            break;
        case addressConstants.GET_ADDRESS_BOOK_FAILED:
            state.addressBook = null;
            break;
        case addressConstants.ADD_NEW_ADDRESS_SUCCESS:
            state.newAddressId = action.payload;
            break;
        case addressConstants.UPDATE_ADDRESS_SUCCESS:
            state.updateAddressSuccess = true;
            break;
        default:
            return;
    }
}, initialState);

export default reducer;