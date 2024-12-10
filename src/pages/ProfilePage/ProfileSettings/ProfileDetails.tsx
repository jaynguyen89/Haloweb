import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPenClip } from '@fortawesome/free-solid-svg-icons/faPenClip';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FormControl, InputLabel, Select, TextField, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AvatarPlaceholderImg } from 'src/assets/images';
import FaIcon from 'src/components/atoms/FaIcon';
import useStyles from 'src/pages/ProfilePage/styles';

type TProfileDetailsProps = {
    id: string,
};

const ProfileDetails = ({
    id,
}: TProfileDetailsProps) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const theme = useTheme();

    const [avatarMenuAnchor, setAvatarMenuAnchor] = React.useState<null | SVGSVGElement>(null);
    const open = !!avatarMenuAnchor;

    return (
        <div className={styles.profileDetails}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>

            <Grid container spacing={2}>
                <Grid item md={12} lg={4}>
                    <div className='avatar-wrapper'>
                        <img alt='Remy Sharp' src={AvatarPlaceholderImg} />
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
                            <FaIcon wrapper='fa' t='obj' ic={faPenClip} color={theme.palette.warning.main} />
                        </MenuItem>
                        <MenuItem onClick={() => setAvatarMenuAnchor(null)}>
                            <FaIcon wrapper='fa' t='obj' ic={faTrash} color={theme.palette.error.main} />
                        </MenuItem>
                    </Menu>
                </Grid>
                <Grid item md={12} lg={8}>
                    <div className='profile-form'>
                        <Grid container spacing={2}>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    label={t(`profile-page.${id}.given-name-label`)}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    label={t(`profile-page.${id}.middle-name-label`)}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    label={t(`profile-page.${id}.family-name-label`)}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid item md={8} sm={6} xs={12}>
                                <TextField
                                    label={t(`profile-page.${id}.full-name-label`)}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='gender-select-label'>{t(`profile-page.${id}.gender-label`)}</InputLabel>
                                    <Select
                                        labelId='gender-select-label'
                                        label={t(`profile-page.${id}.gender-label`)}
                                        variant='outlined'
                                    >
                                        <MenuItem key='none' value=''>
                                            <FaIcon wrapper='fa' t='obj' ic={faMinus} />
                                        </MenuItem>
                                        <MenuItem key='male' value='male'>Male</MenuItem>
                                        <MenuItem key='female' value='female'>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    label={t(`profile-page.${id}.preferred-name-label`)}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    label={t(`profile-page.${id}.dob-label`)}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    label={t(`profile-page.${id}.ethnicity-label`)}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <h4>{t(`profile-page.${id}.work-interest-hoppies`)}</h4>
                                <Grid container spacing={2}>
                                    <Grid item md={6} sm={6} xs={12}>
                                        <TextField
                                            label={t(`profile-page.${id}.company-label`)}
                                            style={{width: '100%'}}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12}>
                                        <TextField
                                            label={t(`profile-page.${id}.job-title-label`)}
                                            style={{width: '100%'}}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label={t(`profile-page.${id}.interest-hoppies-label`)}
                                            style={{width: '100%'}}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            label={t(`profile-page.${id}.websites-label`)}
                                            style={{width: '100%'}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <h4>
                                    {t(`profile-page.${id}.websites-label`)}
                                    <IconButton>
                                        <FaIcon wrapper='fa' t='obj' ic={faPlus} />
                                    </IconButton>
                                </h4>

                                <Grid container spacing={2}>
                                    <Grid item md={1} sm={1} xs={1}>
                                        <IconButton style={{verticalAlign: 'text-top'}}>
                                            <FaIcon wrapper='fa' t='obj' ic={faTimes} color={theme.palette.error.main} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item md={3} sm={4} xs={4}>
                                        <TextField
                                            label={t(`profile-page.${id}.website-name-label`)}
                                            style={{width: '100%'}}
                                        />
                                    </Grid>
                                    <Grid item md={8} sm={7} xs={7}>
                                        <TextField
                                            label={t(`profile-page.${id}.websites-label`)}
                                            style={{width: '100%'}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProfileDetails;
