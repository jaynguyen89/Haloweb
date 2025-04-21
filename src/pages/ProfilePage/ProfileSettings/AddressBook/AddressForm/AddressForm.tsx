import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IEasternAddress, IUnifiedAddress, IWesternAddress } from 'src/models/Address';
import { ActionType, AddressVariant } from 'src/models/enums/apiEnums';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import {
    EasternAddressFormFields,
    getDefaultEasternAddressData,
    getDefaultWesternAddressData,
    initialEasternAddressFormState,
    initialWesternAddressFormState,
    WesternAddressFormFields,
} from 'src/pages/ProfilePage/ProfileSettings/AddressBook/utilities';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import WesternAddressForm from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressForm/WesternAddressForm';
import EasternAddressForm from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressForm/EasternAddressForm';
import { batch, connect, useDispatch } from 'react-redux';
import { TRootState } from 'src/redux/reducers';
import { surrogate } from 'src/utilities/otherUtilities';
import { sendRequestToGetLocalityData } from 'src/redux/actions/localityActions';
import useAuthorization from 'src/hooks/useAuthorization';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import _cloneDeep from 'lodash/cloneDeep';

type TAddressFormProps = {
    id: string,
    action: ActionType,
    address: IEasternAddress | IWesternAddress | null,
};

const mapStateToProps = (state: TRootState) => ({
    localities: state.localityStore.localities,
});

const AddressForm = ({
    id,
    action,
    address,
    localities,
}: ReturnType<typeof mapStateToProps> & TAddressFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { authorization } = useAuthorization();
    const isLoadingLocalities = useIsStageIncluded(Stages.REQUEST_TO_GET_LOCALITY_DATA_BEGIN);

    const [formData, setFormData] = useState<IUnifiedAddress>(initialWesternAddressFormState);
    const [variant, setVariant] = useState<AddressVariant>(AddressVariant.Western);

    useEffect(() => {
        surrogate(dispatch, sendRequestToGetLocalityData(authorization));
    }, []);

    useEffect(() => {
        if (action === ActionType.Add || !Boolean(address)) {
            setFormData(initialWesternAddressFormState);
            return;
        }

        if (address!.variant === AddressVariant.Western) setFormData(getDefaultWesternAddressData(address as IWesternAddress));
        else setFormData(getDefaultEasternAddressData(address as IEasternAddress));
    }, [action, address]);

    const { divisions, countries } = useMemo(() => {
        const countries = localities.map(locality => locality.country);

        if (!Boolean(formData[variant === AddressVariant.Western ? WesternAddressFormFields.CountryId : EasternAddressFormFields.CountryId].value))
            return { divisions: [], countries };

        const localityByCountryId = localities.filter(
            locality => locality.country.id === formData[
                variant === AddressVariant.Western ? WesternAddressFormFields.CountryId : EasternAddressFormFields.CountryId
            ].value,
        );
        return { divisions: localityByCountryId[0].divisions, countries };
    }, [formData, localities, variant]);

    const handleVariantSelect = (variant: AddressVariant) => {
        batch(() => {
            setVariant(variant);

            if (variant === AddressVariant.Western) {
                setFormData(Boolean(address) ? getDefaultWesternAddressData(address as IWesternAddress) : initialWesternAddressFormState);
                return;
            }

            setFormData(Boolean(address) ? getDefaultEasternAddressData(address as IEasternAddress) : initialEasternAddressFormState);
        });
    };

    const handleFormData = useCallback((field: keyof typeof WesternAddressFormFields | keyof typeof EasternAddressFormFields, value: string) => {
        const clone = _cloneDeep(formData);

        if (field === WesternAddressFormFields.CountryId || field === EasternAddressFormFields.CountryId)
            clone[variant === AddressVariant.Western ? WesternAddressFormFields.DivisionId : EasternAddressFormFields.DivisionId].value = undefined;

        clone[field] = { value: value === '' ? undefined : value };
        setFormData(clone);
    }, [variant]);

    return (
        <Grid container spacing={2} style={{marginBottom: '10px'}}>
            {action === ActionType.Add && (
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel id='address-variant-select'>
                            {t(`profile-page.${id}.address-form.variant-radio-label`)}
                        </FormLabel>
                        <RadioGroup
                            row
                            name='address-variant'
                            aria-labelledby='address-variant-select'
                            defaultValue={AddressVariant.Western}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleVariantSelect(+e.target.value)}
                        >
                            {Object.values(AddressVariant)
                                .filter(val => typeof val === 'string')
                                .map((v, i) =>
                                    <FormControlLabel
                                        key={`${v}_${i}`}
                                        control={<Radio />}
                                        label={t(`profile-page.${id}.address-form.variant-${(v as string).toLowerCase()}`)}
                                        value={i}
                                    />,
                                )}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            )}

            {formData[WesternAddressFormFields.Variant].value === AddressVariant.Western && (
                <WesternAddressForm
                    id={id}
                    data={formData}
                    isLoadingData={isLoadingLocalities}
                    divisions={divisions}
                    countries={countries}
                    handleInput={handleFormData}
                />
            )}

            {formData[EasternAddressFormFields.Variant].value === AddressVariant.Eastern && (
                <EasternAddressForm
                    id={id}
                    data={formData}
                    isLoadingData={isLoadingLocalities}
                    divisions={divisions}
                    countries={countries}
                    handleInput={handleFormData}
                />
            )}
        </Grid>
    );
};

export default connect(mapStateToProps)(AddressForm);