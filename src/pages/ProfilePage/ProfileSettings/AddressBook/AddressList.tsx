import React from 'react';
import { TableCell, TableRow, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FaIcon from 'src/components/atoms/FaIcon';
import { faPenClip } from '@fortawesome/free-solid-svg-icons/faPenClip';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { IAddressBook } from 'src/models/AddressBook';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { ActionType } from 'src/models/enums/apiEnums';

type TAddressListProps = {
    addressBook: IAddressBook,
    menuOpen: boolean,
    onMenuItemClick: (addressId: string, itemTarget: JSX.Element) => void,
    onActionClick: (addressId: string, action: ActionType) => void,
    actionDisabled: boolean,
};

const AddressList = ({
    addressBook,
    menuOpen,
    onMenuItemClick,
    onActionClick,
    actionDisabled,
}: TAddressListProps) => {
    const theme = useTheme();

    return (
        <>
            {Boolean(addressBook) && addressBook.addresses.map(fineAddress => {
                if (fineAddress.isForDelivery || fineAddress.isForPostage || fineAddress.isForReturn)
                    return undefined;

                return (
                    <TableRow key={fineAddress.id}>
                        <TableCell className='address-cell'>
                            <p>{fineAddress.address.normalizedAddress}</p>
                            <IconButton
                                aria-haspopup='true'
                                aria-controls={menuOpen ? 'address-item-menu' : undefined}
                                aria-expanded={menuOpen ? true : undefined}
                                onClick={e => onMenuItemClick(fineAddress.address.id, e.currentTarget)}
                            >
                                <MoreHoriz color='primary.dark' />
                            </IconButton>
                        </TableCell>
                        <TableCell className='actions-cell'>
                            <IconButton onClick={() => onActionClick(fineAddress.address.id, ActionType.Update)} disabled={actionDisabled}>
                                <FaIcon wrapper='fa' size='xs' t='obj' ic={faPenClip} color={theme.palette.warning.main} />
                            </IconButton>
                            <IconButton onClick={() => onActionClick(fineAddress.address.id, ActionType.Remove)}>
                                <FaIcon wrapper='fa' size='xs' t='obj' ic={faTrash} color={theme.palette.error.main} disabled={actionDisabled}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    );
};

export default AddressList;