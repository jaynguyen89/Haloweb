import React from 'react';
import { IUnifiedAddress } from 'src/models/Address';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type TEasternAddressFormProps = {
    id: string,
    data: IUnifiedAddress,
};

const EasternAddressForm = ({
    id,
    data,
}: TEasternAddressFormProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.building-name-label`)}
                    value={data.buildingName}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.po-box-label`)}
                    value={data.poBoxNumber}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.street-address-label`)}
                    value={data.streetAddress}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.lane-label`)}
                    value={data.lane}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.group-label`)}
                    value={data.group}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.quarter-label`)}
                    value={data.quarter}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.hamlet-label`)}
                    value={data.hamlet}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.commute-label`)}
                    value={data.commute}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.ward-label`)}
                    value={data.ward}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.district-label`)}
                    value={data.district}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.town-label`)}
                    value={data.town}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.city-label`)}
                    value={data.city}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.province-label`)}
                    value={data.divisionId}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.country-label`)}
                    value={data.countryId}
                />
            </Grid>
        </>
    );
};

export default EasternAddressForm;