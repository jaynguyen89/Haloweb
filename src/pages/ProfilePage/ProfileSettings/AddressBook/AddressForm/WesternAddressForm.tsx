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
import {
    EasternAddressFormFields,
    WesternAddressFormFields,
} from 'src/pages/ProfilePage/ProfileSettings/AddressBook/utilities';
import MessageCaption from 'src/components/atoms/MessageCaption';
import Button from '@mui/material/Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { AddressVariant } from 'src/models/enums/apiEnums';
import { TFormDataState } from 'src/utilities/data-validators/dataValidators';

type TWesternAddressFormProps = {
    id: string,
    data: IUnifiedAddress,
    isLoadingData: boolean,
    divisions: Array<IDivision>,
    countries: Array<ICountryData>,
    handleInput: (field: keyof typeof WesternAddressFormFields, value: string) => void,
    disableSubmit: boolean,
    onSubmit: (variant: AddressVariant, formData: TFormDataState<typeof WesternAddressFormFields | typeof EasternAddressFormFields>) => void,
};

const WesternAddressForm = ({
    id,
    data,
    isLoadingData,
    divisions,
    countries,
    handleInput,
    disableSubmit,
    onSubmit,
}: TWesternAddressFormProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.building-name-label`)}
                    value={data[WesternAddressFormFields.BuildingName].value}
                    onChange={e => handleInput(WesternAddressFormFields.BuildingName, e.target.value)}
                />
                {data[WesternAddressFormFields.BuildingName].caption && (
                    <MessageCaption message={data[WesternAddressFormFields.BuildingName].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.po-box-label`)}
                    value={data[WesternAddressFormFields.PoBoxNumber].value}
                    onChange={e => handleInput(WesternAddressFormFields.PoBoxNumber, e.target.value)}
                />
                {data[WesternAddressFormFields.PoBoxNumber].caption && (
                    <MessageCaption message={data[WesternAddressFormFields.PoBoxNumber].caption} />
                )}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.street-address-label`)}
                    value={data[WesternAddressFormFields.StreetAddress].value}
                    onChange={e => handleInput(WesternAddressFormFields.StreetAddress, e.target.value)}
                />
                {data[WesternAddressFormFields.StreetAddress].caption && (
                    <MessageCaption message={data[WesternAddressFormFields.StreetAddress].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.suburb-label`)}
                    value={data[WesternAddressFormFields.Suburb].value}
                    onChange={e => handleInput(WesternAddressFormFields.Suburb, e.target.value)}
                />
                {data[WesternAddressFormFields.Suburb].caption && (
                    <MessageCaption message={data[WesternAddressFormFields.Suburb].caption} />
                )}
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    label={t(`profile-page.${id}.address-form.postcode-label`)}
                    value={data[WesternAddressFormFields.Postcode].value}
                    onChange={e => handleInput(WesternAddressFormFields.Postcode, e.target.value)}
                />
                {data[WesternAddressFormFields.Postcode].caption && (
                    <MessageCaption message={data[WesternAddressFormFields.Postcode].caption} />
                )}
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
                                value={data[WesternAddressFormFields.DivisionId].value ?? ''}
                                onChange={e => handleInput(WesternAddressFormFields.DivisionId, e.target.value)}
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
                        {data[WesternAddressFormFields.DivisionId].caption && (
                            <MessageCaption message={data[WesternAddressFormFields.DivisionId].caption} />
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
                                value={data[WesternAddressFormFields.CountryId].value ?? ''}
                                onChange={e => handleInput(WesternAddressFormFields.CountryId, e.target.value)}
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
                        {data[WesternAddressFormFields.CountryId].caption && (
                            <MessageCaption message={data[WesternAddressFormFields.CountryId].caption} />
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

export default WesternAddressForm;