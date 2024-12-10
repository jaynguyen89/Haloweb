import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPenClip } from '@fortawesome/free-solid-svg-icons/faPenClip';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { LocalShippingRounded, OtherHousesRounded } from '@mui/icons-material';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useCommonStyles from 'src/commons/styles';
import FaIcon from 'src/components/atoms/FaIcon';
import useStyles from 'src/pages/ProfilePage/styles';

type TAddressBookProps = {
    id: string,
};

const AddressBook = ({
    id,
}: TAddressBookProps) => {
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <div className={styles.addressBook}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
            <Grid container spacing={2}>
                <Grid item md={6} sm={6} xs={12}>
                    <Chip
                        icon={<LocalShippingRounded/>}
                        label={t(`profile-page.${id}.shipping-label`)}
                        color='secondary'
                    />
                    <p className='addressText'>Unit 2, 111-112 Anywhere CL.</p>
                    <p className='addressText'>SOMEWHERE, 3000</p>
                    <p className='addressText'>Australia</p>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Chip
                        icon={<OtherHousesRounded/>}
                        label={t(`profile-page.${id}.delivery-label`)}
                        color='info'
                    />
                    <p className='addressText'>Creek 75, 131/1A2 To Hien Thanh ST.</p>
                    <p className='addressText'>Group 2, Ward 9, District 10</p>
                    <p className='addressText'>Saigon City</p>
                    <p className='addressText'>Vietnam</p>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <p className='other-address'>
                        {t(`profile-page.${id}.other-addresses`)}
                        <IconButton>
                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faPlus} />
                        </IconButton>
                    </p>
                    <TableContainer component={Box}>
                        <Table className={commonStyles.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t(`profile-page.${id}.table-address`)}</TableCell>
                                    <TableCell>{t(`profile-page.${id}.table-setas`)}</TableCell>
                                    <TableCell>{t(`profile-page.${id}.table-actions`)}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>BO Box 123456-789012, Sunshine PO, 23 Gengala RD., Sunshine West 3020</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faTruck} color={theme.palette.secondary.main} />
                                        </IconButton>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faHouse} color={theme.palette.info.main} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faPenClip} color={theme.palette.warning.main} />
                                        </IconButton>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faTrash} color={theme.palette.error.main} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>BO Box 123456-789012, Sunshine PO, 23 Gengala RD., Sunshine West 3020</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faTruck} color={theme.palette.secondary.main} />
                                        </IconButton>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faHouse} color={theme.palette.info.main} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faPenClip} color={theme.palette.warning.main} />
                                        </IconButton>
                                        <IconButton>
                                            <FaIcon wrapper='fa' size='xs' t='obj' ic={faTrash} color={theme.palette.error.main} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddressBook;
