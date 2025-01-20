import React from 'react';
import { AvatarPlaceholderImg } from 'src/assets/images';
import IconButton from '@mui/material/IconButton';
import FaIcon from 'src/components/atoms/FaIcon';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { faPenClip } from '@fortawesome/free-solid-svg-icons/faPenClip';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useTheme } from '@mui/material';

type TProfileAvatarProps = {
    id?: string;
};

const ProfileAvatar = ({
    id,
}: TProfileAvatarProps) => {
    const theme = useTheme();

    const [avatarMenuAnchor, setAvatarMenuAnchor] = React.useState<null | SVGSVGElement>(null);
    const open = !!avatarMenuAnchor;

    return (
        <>
            <div className='avatar-wrapper'>
                <img alt='Remy Sharp' src={AvatarPlaceholderImg}/>
                <IconButton>
                    <FaIcon
                        id='avatar-menu'
                        wrapper='fa' t='obj'
                        ic={faPenToSquare}
                        aria-controls={open ? 'avatar-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={e => setAvatarMenuAnchor(e.currentTarget)}
                    />
                </IconButton>
            </div>
            <Menu
                id='avatar-menu'
                anchorEl={avatarMenuAnchor}
                open={open}
                onClose={() => setAvatarMenuAnchor(null)}
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
                <MenuItem onClick={() => setAvatarMenuAnchor(null)}>
                    <FaIcon wrapper='fa' t='obj' ic={faPenClip} color={theme.palette.warning.main}/>
                </MenuItem>
                <MenuItem onClick={() => setAvatarMenuAnchor(null)}>
                    <FaIcon wrapper='fa' t='obj' ic={faTrash} color={theme.palette.error.main}/>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileAvatar;