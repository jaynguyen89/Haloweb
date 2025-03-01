import React, { useState } from 'react';
import { AvatarPlaceholderImg } from 'src/assets/images';
import IconButton from '@mui/material/IconButton';
import FaIcon from 'src/components/atoms/FaIcon';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import configs from 'src/commons/configs';
import { useTranslation } from 'react-i18next';
import { FileValidator, InputData, TFileOption } from 'src/utilities/data-validators/dataValidators';
import { sendRequestToChangeAvatar, sendRequestToRemoveAvatar } from 'src/redux/actions/profileActions';
import useAuthorization from 'src/hooks/useAuthorization';
import { useDispatch } from 'react-redux';
import MessageCaption from 'src/components/atoms/MessageCaption';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import Stages from 'src/models/enums/stage';
import { useIsStageIncluded } from 'src/hooks/useStage';
import PhotoMenu from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileAvatar/PhotoMenu';

const mediaPath = `${configs.mediaBasePath}/${configs.avatarDir}`;

type TProfileAvatarProps = {
    id: string,
    avatarName: string | null;
    onAvatarChanged: () => void,
};

const ProfileAvatar = ({
    id,
    avatarName,
    onAvatarChanged,
}: TProfileAvatarProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { authorization, profileId, username } = useAuthorization();

    const [errors, setErrors] = useState<Array<string>>([]);
    const isLoading = useIsStageIncluded(Stages.REQUEST_TO_REMOVE_AVATAR_BEGIN);
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
                {isLoading && (<Loading stage={Stages.SHOWCASE} />)}
                {errors.length !== 0 && errors.map((error) => <MessageCaption message={error} type='error' />)}
            </div>
            <PhotoMenu
                open={open}
                menuAnchor={avatarMenuAnchor}
                setMenuAnchor={setAvatarMenuAnchor}
                handleChangeAvatar={handleChangeAvatar}
                handleRemoveAvatar={handleRemoveAvatar}
            />
        </>
    );
};

export default ProfileAvatar;