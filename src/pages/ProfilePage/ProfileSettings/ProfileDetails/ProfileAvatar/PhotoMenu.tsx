import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FaIcon from 'src/components/atoms/FaIcon';
import { faPenClip } from '@fortawesome/free-solid-svg-icons/faPenClip';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import Menu from '@mui/material/Menu';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

type TPhotoMenuProps = {
    open: boolean,
    menuAnchor: null | SVGSVGElement,
    setMenuAnchor: (anchor: null | SVGSVGElement) => void,
    handleChangeAvatar: (files: FileList | null) => void,
    handleRemoveAvatar: () => void,
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const PhotoMenu = ({
    open,
    menuAnchor,
    setMenuAnchor,
    handleChangeAvatar,
    handleRemoveAvatar,
}: TPhotoMenuProps) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Menu
            id='avatar-menu'
            anchorEl={menuAnchor}
            open={open}
            onClose={() => setMenuAnchor(null)}
            MenuListProps={{
                'aria-labelledby': 'avatar-menu',
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem>
                <Button
                    component='label'
                    role={undefined}
                    variant='contained'
                    tabIndex={-1}
                    startIcon={<FaIcon wrapper='fa' t='obj' ic={faPenClip} color={theme.palette.warning.main} />}
                >
                    {t('buttons.change')}
                    <VisuallyHiddenInput
                        type='file'
                        onChange={(e) => handleChangeAvatar(e.target.files)}
                    />
                </Button>
            </MenuItem>
            <MenuItem>
                <Button
                    component='label'
                    role={undefined}
                    variant='contained'
                    tabIndex={-1}
                    startIcon={<FaIcon wrapper='fa' t='obj' ic={faTrash} color={theme.palette.error.main} />}
                    onClick={() => handleRemoveAvatar()}
                >
                    {t('buttons.remove')}
                </Button>
            </MenuItem>
        </Menu>
    );
};

export default PhotoMenu;