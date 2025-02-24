import React, { useCallback, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import WebsiteItem from 'src/pages/ProfilePage/ProfileSettings/ProfileDetails/ProfileInformation/Websites/WebsiteItem';
import FaIcon from 'src/components/atoms/FaIcon';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import {
    FormControl,
    InputLabel,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import HaloModal from 'src/components/molecules/HaloModal';
import { IProfileLink } from 'src/models/Profile';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import Stages from 'src/models/enums/stage';
import { TRootState } from 'src/redux/reducers';
import { batch, connect, useDispatch } from 'react-redux';
import { ActionType, SocialMedia } from 'src/models/enums/apiEnums';
import md5 from 'md5';
import { InputData, RangeValidator, TRangeOption } from 'src/utilities/data-validators/dataValidators';
import MessageCaption from 'src/components/atoms/MessageCaption';
import useAuthorization from 'src/hooks/useAuthorization';
import { sendRequestToUpdateProfileDetails } from 'src/redux/actions/profileActions';

type TWebsitesProps = {
    id: string,
    links: Array<IProfileLink> | null,
    onLinksChanged: () => void,
};

enum ModalTask {
    Create = 'Create',
    Update = 'Update',
}

const mapStateToProps = (state: TRootState) => ({
    publicData: state.publicDataStore.publicData,
});

const Websites = ({
    id,
    links,
    publicData,
    onLinksChanged,
}: ReturnType<typeof mapStateToProps> & TWebsitesProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { authorization, profileId } = useAuthorization();

    const [openModal, setOpenModal] = React.useState(false);
    const [modalTask, setModalTask] = React.useState<ModalTask | null>(null);
    const [originalLink, setOriginalLink] = React.useState<IProfileLink | null>(null);
    const [linkData, setLinkData] = React.useState<IProfileLink>({ linkType: SocialMedia.Facebook, linkHref: '' });
    const [modalError, setModalError] = React.useState<string | null>(null);
    const [sectionError, setSectionError] = React.useState<string | null>(null);

    const handleModal = (task: ModalTask) => {
        setOpenModal(!openModal);
        setModalTask(task);
    };

    const addOrUpdateLink = useCallback(async () => {
        const validator = new RangeValidator(
            new InputData(linkData.linkHref), {
                pattern: '(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})',
                wholePattern: true,
            } as TRangeOption);

        const validation = validator.validate();
        if (validation.isValid) {
            if ((links ?? []).some(link => link.linkHref === linkData.linkHref)) {
                setModalError(t(`profile-page.${id}.modal-link-duplicate`));
                return;
            }

            let actionType = ActionType.Add;
            let values = [];
            if (modalTask === ModalTask.Create)
                values = [{
                    key: linkData.linkType,
                    value: linkData.linkHref,
                }];

            if (modalTask === ModalTask.Update) {
                actionType = ActionType.Update;

                const unchangedLinks = (links ?? []).filter(link =>
                    link.linkHref === originalLink!.linkHref &&
                    link.linkType === originalLink!.linkType,
                );
                const allLinks = [...unchangedLinks, {...linkData}];
                values = allLinks.map(link => ({ key: link.linkType, value: link.linkHref }));
            }

            const data = {
                fieldName: 'Websites',
                actionType: actionType,
                intValueList: values,
            };
            const result = await sendRequestToUpdateProfileDetails(dispatch, authorization, profileId, data);

            if (result === true) {
                batch(() => {
                    setLinkData({linkType: SocialMedia.Facebook, linkHref: ''});
                    setOriginalLink(null);
                    setOpenModal(false);
                    setModalTask(null);
                    setModalError(null);
                });
                onLinksChanged();
            }
            else
                setModalError(t(`profile-page.${id}.modal-link-error`));

            return;
        }

        setModalError(t(validation.messages.entries().next().value[0], validation.messages.entries().next().value[1]));
    }, [linkData, modalTask, originalLink]);

    useEffect(() => {
        if (Boolean(originalLink) && modalTask === null && !openModal) {
            if (!confirm(t(`profile-page.${id}.link-removal-confirmation`, {href: originalLink!.linkHref}))) {
                batch(() => {
                    setOriginalLink(null);
                    setSectionError(null);
                });
                return;
            }

            const data = {
                fieldName: 'Websites',
                actionType: ActionType.Remove,
                intValueList: [{
                    key: originalLink!.linkType,
                    value: originalLink!.linkHref,
                }],
            };

            sendRequestToUpdateProfileDetails(dispatch, authorization, profileId, data).then(result => {
                if (result === true) {
                    setOriginalLink(null);
                    onLinksChanged();
                }
                else setSectionError(t(`profile-page.${id}.link-removal-error`));
            });
        }
    }, [originalLink, modalTask, openModal]);

    return (
        <Grid item xs={12}>
            <h4>
                {t(`profile-page.${id}.websites-label`)}
                <IconButton onClick={() => batch(() => {
                        handleModal(ModalTask.Create);
                        setLinkData({ linkType: SocialMedia.Facebook, linkHref: '' });
                        setModalError(null);
                        setSectionError(null);
                    })
                }>
                    <FaIcon wrapper='fa' t='obj' ic={faPlus} />
                </IconButton>
            </h4>

            {sectionError && (
                <MessageCaption message={sectionError} type='error' />
            )}
            <Table size='small'>
                <TableBody>
                    {(links === null && (
                        <TableRow>
                            <TableCell style={{border: 'none'}} colSpan={2}>
                                <Flasher
                                    showAction={false}
                                    stage={Stages.SHOWCASE}
                                    message={t(`profile-page.${id}.website-none`)}
                                />
                            </TableCell>
                        </TableRow>
                    )) || (
                        <>
                            {links.map((link, i) => (
                                <WebsiteItem
                                    key={md5(`${i}_${link.linkType}_${link.linkHref}`)}
                                    link={link}
                                    setData={setLinkData}
                                    linkTypes={publicData.socialMedias}
                                    handleModal={handleModal}
                                    setModalError={setModalError}
                                    setOriginalLink={setOriginalLink}
                                    setSectionError={setSectionError}
                                />
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>

            <HaloModal
                modal={{
                    open: openModal,
                    setOpen: setOpenModal,
                    onClose: () => {
                        setModalTask(null);
                        setOriginalLink(null);
                    },
                }}
                heading={{
                    icon: modalTask === ModalTask.Create ? 'link' : 'pen-nib',
                    text: modalTask === ModalTask.Create
                        ? t(`profile-page.${id}.modal-create`)
                        : t(`profile-page.${id}.modal-update`),
                }}
                button={{
                    text: modalTask === ModalTask.Create ? t('buttons.add') : t('buttons.update'),
                    onClick: addOrUpdateLink,
                }}
            >
                <Grid container spacing={2} style={{marginBottom: '0.5rem'}}>
                    <Grid item md={4} sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='link-type'>{t(`profile-page.${id}.modal-link-type`)}</InputLabel>
                            <Select
                                id='link-type'
                                label={t(`profile-page.${id}.modal-link-type`)}
                                variant='outlined'
                                value={linkData.linkType}
                                onChange={(e) => setLinkData({...linkData, linkType: e.target.value})}
                            >
                                {publicData.socialMedias.map(item => (
                                    <MenuItem key={item.index} value={item.index}>
                                        {item.display}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={8} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            label={t(`profile-page.${id}.modal-link-text`)}
                            value={linkData.linkHref}
                            onChange={(e) => setLinkData({...linkData, linkHref: e.target.value})}
                        />
                    </Grid>
                    {modalError && (
                        <Grid item xs={12}>
                            <MessageCaption message={modalError} type='error' />
                        </Grid>
                    )}
                </Grid>
            </HaloModal>
        </Grid>
    );
};

export default connect(mapStateToProps)(Websites);