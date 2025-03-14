import React from 'react';
import { IUnifiedAddress } from 'src/models/Address';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ICountryData, IDivision } from 'src/models/Locality';
import FormSkeleton from 'src/components/atoms/Skeletons/FormSkeleton';
import MenuItem from '@mui/material/MenuItem';
import FaIcon from 'src/components/atoms/FaIcon';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';

type TWesternAddressFormProps = {
    id: string,
    data: IUnifiedAddress,
    isLoadingData: boolean,
    divisions: Array<IDivision>,
    countries: Array<ICountryData>,
};

const WesternAddressForm = ({
    id,
    data,
    isLoadingData,
    divisions,
    countries,
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

            {isLoadingData && <FormSkeleton />}
            {!isLoadingData && (
                <>
                    <Grid item sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='province-select-label'>
                                {t(`profile-page.${id}.address-form.state-label`)}
                            </InputLabel>
                            <Select
                                variant='outlined'
                                labelId='province-select-label'
                                label={t(`profile-page.${id}.address-form.state-label`)}
                                value={data.divisionId}
                            >
                                <MenuItem key='none' value=''>
                                    <FaIcon wrapper='fa' t='obj' ic={faMinus} />
                                </MenuItem>
                                {divisions.map(division => (
                                    <MenuItem key={division.id} value={division.id}>
                                        {division.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='country-select-label'>
                                {t(`profile-page.${id}.address-form.country-label`)}
                            </InputLabel>
                            <Select
                                variant='outlined'
                                labelId='country-select-label'
                                label={t(`profile-page.${id}.address-form.country-label`)}
                                value={data.countryId}
                            >
                                <MenuItem key='none' value=''>
                                    <FaIcon wrapper='fa' t='obj' ic={faMinus} />
                                </MenuItem>
                                {countries.map(country => (
                                    <MenuItem key={country.id} value={country.id}>
                                        <CountryFlag
                                            isoCountryCode={country.isoCode2Char}
                                            styles={{marginRight: '7px'}}
                                        />
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            )}
        </>
    );
};

export default WesternAddressForm;