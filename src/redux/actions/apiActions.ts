import { Dispatch } from 'redux';
import * as apiConstants from 'src/redux/constants/apiConstants';
import RequestBuilder from '../../fetcher/RequestBuilder';
import INavbarItem from '../../models/Navbar';

export const getNavbarMenuItems = () => {
    const request = new RequestBuilder<Array<INavbarItem>>();

    return (dispatch: Dispatch) => dispatch({
        type: apiConstants.GET_NAVBAR_MENU_ITEMS_BEGIN,
        payload: {},
    });
};
