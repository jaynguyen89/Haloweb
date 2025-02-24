import { Chip, TableCell, TableRow, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { batch } from 'react-redux';
import FaIcon from 'src/components/atoms/FaIcon';
import React from 'react';
import { IProfileLink } from 'src/models/Profile';
import { TPublicDataFormat } from 'src/models/PublicData';

type TWebsiteItemProps = {
    key: string,
    link: IProfileLink,
    linkTypes: Array<TPublicDataFormat>,
    setData: (link: IProfileLink) => void,
    handleModal: (open: boolean) => void,
    setModalError: (error: string | null) => void,
    setOriginalLink: (link: IProfileLink | null) => void,
    setSectionError: (error: string | null) => void,
};

const WebsiteItem = ({
    key,
    link,
    linkTypes,
    setData,
    handleModal,
    setModalError,
    setOriginalLink,
    setSectionError,
}: TWebsiteItemProps) => {
    const theme = useTheme();
    const linkType = linkTypes.find(linkType => linkType.index === link.linkType);

    return (
        <TableRow key={key}>
            <TableCell>
                <Chip label={linkType.display} size='small' color='info' />
                <span
                    style={{marginLeft: '10px'}}
                    className='link'
                >{link.linkHref}</span>
            </TableCell>
            <TableCell align='right'>
                <IconButton
                    style={{marginRight: '10px'}}
                    size='small'
                    onClick={() => batch(() => {
                        setData({...link});
                        setOriginalLink({...link});
                        handleModal(ModalTask.Update);
                        setModalError(null);
                        setSectionError(null);
                    })}
                >
                    <FaIcon wrapper='i' ic='pencil' size='sm' color={theme.palette.secondary.main} />
                </IconButton>
                <IconButton size='small' onClick={() => setOriginalLink({...link})}>
                    <FaIcon wrapper='i' ic='xmark' color={theme.palette.error.main} />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default WebsiteItem;