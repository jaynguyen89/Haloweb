import produce from 'immer';
import { AnyAction } from 'redux';
import * as occupationConstants from 'src/redux/constants/occupationConstants';

interface IOccupationStore {

}

const initialState: IOccupationStore = {

};

const reducer = produce((state: IOccupationStore, action: AnyAction) => {
    switch (action.type) {
        default:
            return;
    }
}, initialState);

export default reducer;
