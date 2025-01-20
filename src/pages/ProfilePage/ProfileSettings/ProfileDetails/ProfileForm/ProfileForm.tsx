import React from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FaIcon from 'src/components/atoms/FaIcon';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import IconButton from '@mui/material/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { useTranslation } from 'react-i18next';
import SavableInput from 'src/components/molecules/SavableInput/SavableInput';
import SavableSelect from 'src/components/molecules/SavableSelect/SavableSelect';
import { IProfileDetails } from 'src/models/Profile';

type TProfileFormProps = {
    id: string,
};

const ProfileForm = ({
    id,
}: TProfileFormProps) => {
    const { t } = useTranslation();
    const theme = useTheme();

    const [profileDetails, setProfileDetails] = React.useState<IProfileDetails>();

    return (
        <div className='profile-form'>
            <h4>{t(`profile-page.${id}.basic-information`)}</h4>
            <Grid container spacing={2}>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.given-name-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.middle-name-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.family-name-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={8} sm={6} xs={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.full-name-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <SavableSelect
                        id='gender-select-label'
                        label={t(`profile-page.${id}.gender-label`)}
                        variant='outlined'
                    >
                        <MenuItem key='none' value=''>
                            <FaIcon wrapper='fa' t='obj' ic={faMinus}/>
                        </MenuItem>
                        <MenuItem key='male' value='male'>Male</MenuItem>
                        <MenuItem key='female' value='female'>Female</MenuItem>
                    </SavableSelect>
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.preferred-name-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.dob-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.ethnicity-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.company-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableSelect
                        id='occupation-select-label'
                        label={t(`profile-page.${id}.occupation-label`)}
                        variant='outlined'
                    >
                        <MenuItem key='none' value=''>
                            <FaIcon wrapper='fa' t='obj' ic={faMinus}/>
                        </MenuItem>
                        <MenuItem key='male' value='male'>Male</MenuItem>
                        <MenuItem key='female' value='female'>Female</MenuItem>
                    </SavableSelect>
                </Grid>
                <Grid item md={4} sm={12}>
                    <SavableInput
                        label={t(`profile-page.${id}.job-title-label`)}
                        style={{width: '100%'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4>
                        {t(`profile-page.${id}.websites-label`)}
                        <IconButton>
                            <FaIcon wrapper='fa' t='obj' ic={faPlus}/>
                        </IconButton>
                    </h4>

                    <Grid container spacing={2}>
                        <Grid item md={1} sm={1} xs={1}>
                            <IconButton style={{verticalAlign: 'text-top'}}>
                                <FaIcon wrapper='fa' t='obj' ic={faTimes} color={theme.palette.error.main}/>
                            </IconButton>
                        </Grid>
                        <Grid item md={3} sm={4} xs={4}>
                            <SavableInput
                                label={t(`profile-page.${id}.website-name-label`)}
                                style={{width: '100%'}}
                            />
                        </Grid>
                        <Grid item md={8} sm={7} xs={7}>
                            <SavableInput
                                label={t(`profile-page.${id}.websites-label`)}
                                style={{width: '100%'}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProfileForm;
