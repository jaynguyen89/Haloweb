import React, { useState } from 'react';
import { AvatarPlaceholderImg } from 'src/assets/images';
import IconButton from '@mui/material/IconButton';
import FaIcon from 'src/components/atoms/FaIcon';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { faPenClip } from '@fortawesome/free-solid-svg-icons/faPenClip';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useTheme } from '@mui/material';
import configs from 'src/commons/configs';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { FileValidator, InputData, TFileOption } from 'src/utilities/data-validators/dataValidators';
import { sendRequestToChangeAvatar, sendRequestToRemoveAvatar } from 'src/redux/actions/profileActions';
import useAuthorization from 'src/hooks/useAuthorization';
import { useDispatch } from 'react-redux';
import MessageCaption from 'src/components/atoms/MessageCaption';

const mediaPath = `${configs.mediaBasePath}/${configs.avatarDir}`;

type TProfileAvatarProps = {
    id: string,
    avatarName: string | null;
    onAvatarChanged: () => void,
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

const ProfileAvatar = ({
    id,
    avatarName,
    onAvatarChanged,
}: TProfileAvatarProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { authorization, profileId, username } = useAuthorization();

    const [errors, setErrors] = useState<Array<string>>([]);
    const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | SVGSVGElement>(null);
    const open = !!avatarMenuAnchor;

    const handleChangeAvatar = async (files: FileList | null) => {
        setAvatarMenuAnchor(null);
        if (files === null) return;

        const fileValidator = new FileValidator(new InputData<File>(files[0]), {
            maxSize: configs.photoMaxSize,
            acceptedFormats: configs.photoAcceptedFormats,
        } as TFileOption);

        const { isValid, messages } = fileValidator.validate();
        if (!isValid) {
            const errors = new Array<string>();
            messages!.forEach((params, messageKey, _) => errors.push(t(messageKey as string, params as object)));
            setErrors(errors);
            return;
        }

        const result = await sendRequestToChangeAvatar(dispatch, authorization, profileId, files[0]);
        if (typeof result !== 'string') setErrors([`profile-page.${id}.change-avatar-failed`]);
        else onAvatarChanged();
    };

    const handleRemoveAvatar = async () => {
        setAvatarMenuAnchor(null);
        if (!confirm(t(`profile-page.${id}.remove-avatar-confirmation`))) return;

        const result = await sendRequestToRemoveAvatar(dispatch, authorization, profileId);
        if (!result) setErrors([`profile-page.${id}.remove-avatar-failed`]);
        else onAvatarChanged();
    };

    return (
        <>
            <div className='avatar-wrapper'>
                <img
                    alt={avatarName ? username : 'Avatar Photo'}
                    src={avatarName ? `${mediaPath}/${avatarName}` : AvatarPlaceholderImg}
                />
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
                {errors.length !== 0 && errors.map((error) => <MessageCaption message={error} type='error' />)}
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
        </>
    );
};

export default ProfileAvatar;