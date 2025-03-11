import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import OtherHousesRounded from '@mui/icons-material/OtherHousesRounded';
import RepartitionRoundedIcon from '@mui/icons-material/RepartitionRounded';
import { useTranslation } from 'react-i18next';
import { ActionType } from 'src/models/enums/apiEnums';

type TAddressItemMenuProps = {
    id: string,
    menuOpen: boolean,
    menuAnchor: JSX.Element,
    onMenuClose: () => void,
    onMenuItemClick: (action: ActionType) => void,
    menuItemDisabled: boolean,
};

const AddressItemMenu = ({
    id,
    menuOpen,
    menuAnchor,
    onMenuClose,
    onMenuItemClick,
    menuItemDisabled,
}: TAddressItemMenuProps) => {
    const { t } = useTranslation();

    return (
        <Menu
            anchorEl={menuAnchor}
            open={menuOpen}
            onClose={onMenuClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <span style={{fontWeight: 'bold', marginLeft: '6px'}}>{t(`profile-page.${id}.table-setas`)}</span>
            <MenuItem onClick={() => onMenuItemClick(ActionType.SetAsForShipping)} disabled={menuItemDisabled}>
                <LocalShippingRounded color='secondary' />
            </MenuItem>
            <MenuItem onClick={() => onMenuItemClick(ActionType.SetAsForDelivery)} disabled={menuItemDisabled}>
                <OtherHousesRounded color='info' />
            </MenuItem>
            <MenuItem onClick={() => onMenuItemClick(ActionType.SetAsForReturn)} disabled={menuItemDisabled}>
                <RepartitionRoundedIcon color='warning' />
            </MenuItem>
        </Menu>
    );
};

export default AddressItemMenu;