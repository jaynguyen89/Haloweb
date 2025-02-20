import React from 'react';
import IconButton from '@mui/material/IconButton';
import FaIcon from 'src/components/atoms/FaIcon';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import {
    Chip, FormControl, InputLabel,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow, TextField,
    useTheme,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import HaloModal from 'src/components/molecules/HaloModal';
import { IProfileLink } from 'src/models/Profile';

type TWebsitesProps = {
    id: string,
    links: Array<IProfileLink> | null,
};

const Websites = ({
    id,
    links,
}: TWebsitesProps) => {
    const { t } = useTranslation();

    const [openModal, setOpenModal] = React.useState(false);

    return (
        <Grid item xs={12}>
            <h4>
                {t(`profile-page.${id}.websites-label`)}
                <IconButton>
                    <FaIcon wrapper='fa' t='obj' ic={faPlus}/>
                </IconButton>
            </h4>

            <WebsiteItem id={id} key='some' setOpenModal={setOpenModal} />

            <HaloModal
                modal={{
                    open: openModal,
                    setOpen: setOpenModal,
                    label: '',
                    description: '',
                }}
                heading={{
                    icon: 'pencil',
                    text: 'Update Website',
                }}
                button={{
                    icon: 'paper-plane',
                    text: 'Done',
                    onClick: () => console.log('clicked'),
                }}
            >
                <Grid container spacing={2} style={{marginBottom: '0.5rem'}}>
                    <Grid item md={4} sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='google'>Edit</InputLabel>
                            <Select
                                id='google'
                                label='Edit'
                                variant='outlined'
                            >
                                <MenuItem key='male' value='male'>Male</MenuItem>
                                <MenuItem key='female' value='female'>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={8} sm={6} xs={12}>
                        <TextField fullWidth label='Name' />
                    </Grid>
                </Grid>
            </HaloModal>
        </Grid>
    );
};

export default Websites;

type TWebsiteItemProps = {
    id: string,
    key: string,
    setOpenModal: (open: boolean) => void,
};

const WebsiteItem = ({
    id,
    key,
                         setOpenModal,
}: TWebsiteItemProps) => {
    const theme = useTheme();

    return (
        <Table size='small'>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Chip label='Google' size='small' color='info' />
                        <span
                            style={{marginLeft: '10px'}}
                            className='link'
                        >https://google.com</span>
                    </TableCell>
                    <TableCell align='right'>
                        <IconButton
                            style={{marginRight: '10px'}}
                            size='small'
                            onClick={() => setOpenModal(true)}
                        >
                            <FaIcon wrapper='i' ic='pencil' size='sm' color={theme.palette.secondary.main} />
                        </IconButton>
                        <IconButton size='small'>
                            <FaIcon wrapper='i' ic='xmark' color={theme.palette.error.main} />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};