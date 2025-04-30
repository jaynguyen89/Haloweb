import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCommonStyles from 'src/commons/styles';
import FaIcon from 'src/components/atoms/FaIcon';
import useStyles from 'src/pages/ProfilePage/styles';
import useAuthorization from 'src/hooks/useAuthorization';
import { surrogate } from 'src/utilities/otherUtilities';
import { sendRequestToGetAddressBook } from 'src/redux/actions/addressActions';
import { TRootState } from 'src/redux/reducers';
import { batch, connect, useDispatch } from 'react-redux';
import AddressSummary from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressSummary';
import AddressList from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressList';
import AddressItemMenu from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressItemMenu';
import { ActionType } from 'src/models/enums/apiEnums';
import HaloModal from 'src/components/molecules/HaloModal';
import { IAddressBook, IFineAddress } from 'src/models/AddressBook';
import AddressForm from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressForm/AddressForm';

type TAddressBookProps = {
    id: string,
};

const mapStateToProps = (state: TRootState) => ({
    addressBook: state.addressStore.addressBook,
});

const AddressBookPage = ({
    id,
    addressBook,
}: ReturnType<typeof mapStateToProps> & TAddressBookProps) => {
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { authorization, profileId } = useAuthorization();

    const [addressIdForAction, setAddressIdForAction] = useState<string>('');
    const [menuAnchor, setMenuAnchor] = useState<null | JSX.Element>(null);
    const menuOpen = !!menuAnchor;

    const [openModal, setOpenModal] = React.useState(false);
    const [modalTask, setModalTask] = React.useState<ActionType | null>(null);
    const [addressInAction, setAddressInAction] = React.useState<IFineAddress | null>(null);

    useEffect(() => {
        if (Boolean(authorization) && profileId)
            surrogate(dispatch, sendRequestToGetAddressBook(profileId, authorization));
    }, [authorization, profileId]);

    const handleAddressItemMenuClick = (addressId: string, itemTarget: JSX.Element) => {
        batch(() => {
            setMenuAnchor(itemTarget);
            setAddressIdForAction(addressId);
        });
    };

    const handleAddressItemMenuClose = () => {
        batch(() => {
            setMenuAnchor(null);
            setAddressIdForAction('');
        });
    };

    const handlePopupMenuItemClick = useCallback((action: ActionType) => {
        console.log(action, addressIdForAction);
    }, [addressIdForAction]);

    const handleAddressListActionClick = useCallback((addressId: string, action: ActionType) => {
        if (addressBook === null) return;

        const fineAddressInBook = (addressBook as IAddressBook).addresses
            .filter((fineAddress: IFineAddress) => fineAddress.address.id === addressId)[0];

        if (action === ActionType.Remove) {
            if (confirm(t(`profile-page.${id}.delete-address-confirmation`, { address: fineAddressInBook.address.normalizedAddress }))) {
                console.log('call api to delete address');
            }

            return;
        }

        batch(() => {
            setModalTask(action);
            setAddressInAction(fineAddressInBook);
            setOpenModal(true);
        });
    }, [addressBook]);

    return (
        <div className={styles.addressBook}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
            <Grid container spacing={2}>
                <AddressSummary id={id} addressBook={addressBook} />

                <Grid item md={12} sm={12} xs={12}>
                    <p className='other-address'>
                        {t(`profile-page.${id}.other-addresses`)}
                        <IconButton onClick={() => batch(() => {
                            setModalTask(ActionType.Add);
                            setAddressInAction(null);
                            setOpenModal(true);
                        })}>
                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faPlus} />
                        </IconButton>
                    </p>

                    <TableContainer component={Box}>
                        <Table className={commonStyles.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t(`profile-page.${id}.table-address`)}</TableCell>
                                    <TableCell>{t(`profile-page.${id}.table-actions`)}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <AddressList
                                    addressBook={addressBook}
                                    menuOpen={menuOpen}
                                    onMenuItemClick={handleAddressItemMenuClick}
                                    onActionClick={handleAddressListActionClick}
                                    actionDisabled={false}
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <AddressItemMenu
                id={id}
                menuOpen={menuOpen}
                menuAnchor={menuAnchor}
                onMenuClose={handleAddressItemMenuClose}
                onMenuItemClick={handlePopupMenuItemClick}
                menuItemDisabled={false}
            />

            <HaloModal
                modal={{
                    open: openModal,
                    setOpen: setOpenModal,
                    onClose: () => batch(() => {
                        setModalTask(null);
                        setAddressInAction(null);
                    }),
                }}
                heading={{
                    icon: 'map-location-dot',
                    text: modalTask === ActionType.Add
                        ? t(`profile-page.${id}.modal-create`)
                        : t(`profile-page.${id}.modal-update`),
                }}
            >
                <AddressForm
                    id={id}
                    action={modalTask as ActionType}
                    address={addressInAction?.address}
                />
            </HaloModal>
        </div>
    );
};

export default connect(mapStateToProps)(AddressBookPage);
