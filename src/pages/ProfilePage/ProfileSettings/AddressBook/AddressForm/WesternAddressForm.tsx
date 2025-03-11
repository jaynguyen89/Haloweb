import React from 'react';
import { IUnifiedAddress } from 'src/models/Address';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type TWesternAddressFormProps = {
    id: string,
    data: IUnifiedAddress,
};

const WesternAddressForm = ({
    id,
    data,
}: TWesternAddressFormProps) => {
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
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.street-address-label`)}
                    value={data.streetAddress}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.suburb-label`)}
                    value={data.suburb}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.postcode-label`)}
                    value={data.postcode}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.state-label`)}
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

export default WesternAddressForm;