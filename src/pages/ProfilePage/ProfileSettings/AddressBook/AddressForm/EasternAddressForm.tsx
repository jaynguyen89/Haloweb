import React from 'react';
import { IUnifiedAddress } from 'src/models/Address';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ICountryData, IDivision } from 'src/models/Locality';
import FormSkeleton from 'src/components/atoms/Skeletons/FormSkeleton';
import FaIcon from 'src/components/atoms/FaIcon';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import MenuItem from '@mui/material/MenuItem';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import {
    EasternAddressFormFields,
    WesternAddressFormFields,
} from 'src/pages/ProfilePage/ProfileSettings/AddressBook/utilities';
import MessageCaption from 'src/components/atoms/MessageCaption';
import Button from '@mui/material/Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { AddressVariant } from 'src/models/enums/apiEnums';
import { TFormDataState } from 'src/utilities/data-validators/dataValidators';

type TEasternAddressFormProps = {
    id: string,
    data: IUnifiedAddress,
    isLoadingData: boolean,
    divisions: Array<IDivision>,
    countries: Array<ICountryData>,
    handleInput: (field: keyof typeof EasternAddressFormFields, value: string) => void,
    disableSubmit: boolean,
    onSubmit: (variant: AddressVariant, formData: TFormDataState<typeof WesternAddressFormFields | typeof EasternAddressFormFields>) => void,
};

const EasternAddressForm = ({
    id,
    data,
    isLoadingData,
    divisions,
    countries,
    handleInput,
    disableSubmit,
    onSubmit,
}: TEasternAddressFormProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.building-name-label`)}
                    value={data[EasternAddressFormFields.BuildingName].value}
                    onChange={e => handleInput(EasternAddressFormFields.BuildingName, e.target.value)}
                />
                {data[EasternAddressFormFields.BuildingName].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.BuildingName].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.po-box-label`)}
                    value={data[EasternAddressFormFields.PoBoxNumber].value}
                    onChange={e => handleInput(EasternAddressFormFields.PoBoxNumber, e.target.value)}
                />
                {data[EasternAddressFormFields.PoBoxNumber].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.PoBoxNumber].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.street-address-label`)}
                    value={data[EasternAddressFormFields.StreetAddress].value}
                    onChange={e => handleInput(EasternAddressFormFields.StreetAddress, e.target.value)}
                />
                {data[EasternAddressFormFields.StreetAddress].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.StreetAddress].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.lane-label`)}
                    value={data[EasternAddressFormFields.Lane].value}
                    onChange={e => handleInput(EasternAddressFormFields.Lane, e.target.value)}
                />
                {data[EasternAddressFormFields.Lane].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.Lane].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.group-label`)}
                    value={data[EasternAddressFormFields.Group].value}
                    onChange={e => handleInput(EasternAddressFormFields.Group, e.target.value)}
                />
                {data[EasternAddressFormFields.Group].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.Group].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.quarter-label`)}
                    value={data[EasternAddressFormFields.Quarter].value}
                    onChange={e => handleInput(EasternAddressFormFields.Quarter, e.target.value)}
                />
                {data[EasternAddressFormFields.Quarter].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.Quarter].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.hamlet-label`)}
                    value={data[EasternAddressFormFields.Hamlet].value}
                    onChange={e => handleInput(EasternAddressFormFields.Hamlet, e.target.value)}
                />
                {data[EasternAddressFormFields.Hamlet].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.Hamlet].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.commute-label`)}
                    value={data[EasternAddressFormFields.Commute].value}
                    onChange={e => handleInput(EasternAddressFormFields.Commute, e.target.value)}
                />
                {data[EasternAddressFormFields.Commute].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.Commute].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.ward-label`)}
                    value={data[EasternAddressFormFields.Ward].value}
                    onChange={e => handleInput(EasternAddressFormFields.Ward, e.target.value)}
                />
                {data[EasternAddressFormFields.Ward].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.Ward].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.district-label`)}
                    value={data[EasternAddressFormFields.District].value}
                    onChange={e => handleInput(EasternAddressFormFields.District, e.target.value)}
                />
                {data[EasternAddressFormFields.District].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.District].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.town-label`)}
                    value={data[EasternAddressFormFields.Town].value}
                    onChange={e => handleInput(EasternAddressFormFields.Town, e.target.value)}
                />
                {data[EasternAddressFormFields.Town].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.Town].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.city-label`)}
                    value={data[EasternAddressFormFields.City].value}
                    onChange={e => handleInput(EasternAddressFormFields.City, e.target.value)}
                />
                {data[EasternAddressFormFields.City].caption && (
                    <MessageCaption message={data[EasternAddressFormFields.City].caption} />
                )}
            </Grid>

            {isLoadingData && <FormSkeleton />}
            {!isLoadingData && (
                <>
                    <Grid item sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='province-select-label'>
                                {t(`profile-page.${id}.address-form.province-label`)}
                            </InputLabel>
                            <Select
                                variant='outlined'
                                labelId='province-select-label'
                                label={t(`profile-page.${id}.address-form.province-label`)}
                                value={data[EasternAddressFormFields.DivisionId].value ?? ''}
                                onChange={e => handleInput(EasternAddressFormFields.DivisionId, e.target.value)}
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
                        {data[EasternAddressFormFields.DivisionId].caption && (
                            <MessageCaption message={data[EasternAddressFormFields.DivisionId].caption} />
                        )}
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
                                value={data[EasternAddressFormFields.CountryId].value ?? ''}
                                onChange={e => handleInput(EasternAddressFormFields.CountryId, e.target.value)}
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
                        {data[EasternAddressFormFields.CountryId].caption && (
                            <MessageCaption message={data[EasternAddressFormFields.CountryId].caption} />
                        )}
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: '10px'}}>
                        <Button
                            variant='contained'
                            disabled={disableSubmit}
                            onClick={disableSubmit ? undefined : onSubmit}
                        >
                            {t('buttons.submit')}
                            <FaIcon wrapper='fa' t='obj' ic={faPaperPlane} />
                        </Button>
                    </Grid>
                </>
            )}
        </>
    );
};

export default EasternAddressForm;