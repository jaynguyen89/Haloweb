import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IAddressData, IEasternAddress, IWesternAddress } from 'src/models/Address';
import { ActionType, AddressVariant } from 'src/models/enums/apiEnums';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import {
    createAddressData,
    EasternAddressFormFields,
    easternAddressFormValidatorMap,
    easternAddressFormValidatorOptionsMapFn,
    getDefaultEasternAddressData,
    getDefaultWesternAddressData,
    initialEasternAddressFormState,
    initialWesternAddressFormState,
    WesternAddressFormFields,
    westernAddressFormValidatorMap,
    westernAddressFormValidatorOptionsMapFn,
} from 'src/pages/ProfilePage/ProfileSettings/AddressBook/utilities';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import WesternAddressForm from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressForm/WesternAddressForm';
import EasternAddressForm from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressForm/EasternAddressForm';
import { batch, connect, useDispatch } from 'react-redux';
import { TRootState } from 'src/redux/reducers';
import { surrogate } from 'src/utilities/otherUtilities';
import { sendRequestToGetLocalityData } from 'src/redux/actions/localityActions';
import useAuthorization from 'src/hooks/useAuthorization';
import { useAreStagesIncluded, useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import _cloneDeep from 'lodash/cloneDeep';
import configs from 'src/commons/configs';
import {
    mapFieldsToValidators,
    TFieldToValidatorMap,
    TFormDataState,
} from 'src/utilities/data-validators/dataValidators';
import { useDebounce } from 'src/hooks/eventForger';
import FieldsMediator, { TFieldMediatorOptions } from 'src/utilities/data-validators/fieldsMediator';
import { sendRequestToAddNewAddress, sendRequestToUpdateAddress } from 'src/redux/actions/addressActions';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import MessageCaption from 'src/components/atoms/MessageCaption';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';

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
    const { authorization, profileId } = useAuthorization();
    const isLoadingLocalities = useIsStageIncluded(Stages.REQUEST_TO_GET_LOCALITY_DATA_BEGIN);

    const [formData, setFormData] = useState<
        TFormDataState<typeof WesternAddressFormFields | typeof EasternAddressFormFields>
    >(initialWesternAddressFormState);
    const [updatedField, setUpdatedField] = useState<string | null>(null);
    const [variant, setVariant] = useState<AddressVariant>(AddressVariant.Western);
    const [isFormValid, setIsFormValid] = useState(false);

    const isRequestBegun = useAreStagesIncluded([Stages.REQUEST_TO_ADD_NEW_ADDRESS_BEGIN, Stages.REQUEST_TO_UPDATE_ADDRESS_BEGIN]);
    const isRequestFailed = useAreStagesIncluded([Stages.REQUEST_TO_ADD_NEW_ADDRESS_FAILED, Stages.REQUEST_TO_UPDATE_ADDRESS_FAILED]);

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
            setIsFormValid(false);
        });
    };

    const handleFormData = useCallback((field: keyof typeof WesternAddressFormFields | keyof typeof EasternAddressFormFields, value: string) => {
        const clone = _cloneDeep(formData);

        if (field === WesternAddressFormFields.CountryId || field === EasternAddressFormFields.CountryId)
            clone[variant === AddressVariant.Western ? WesternAddressFormFields.DivisionId : EasternAddressFormFields.DivisionId].value = undefined;

        clone[field] = { value };

        batch(() => {
            setFormData(clone);
            setUpdatedField(field);
        });
    }, [variant, formData]);

    const validators: TFieldToValidatorMap<typeof WesternAddressFormFields | typeof EasternAddressFormFields> = useMemo(() => {
        const tempValidators: TFieldToValidatorMap<typeof WesternAddressFormFields | typeof EasternAddressFormFields> = {};

        if (variant === AddressVariant.Western)
            Object.values(WesternAddressFormFields)
                .forEach(field => tempValidators[field as keyof typeof WesternAddressFormFields] = mapFieldsToValidators(
                    formData,
                    undefined,
                    westernAddressFormValidatorOptionsMapFn,
                    field as keyof typeof WesternAddressFormFields,
                    westernAddressFormValidatorMap[field as keyof typeof WesternAddressFormFields],
                    undefined,
                    {
                        divisionIds: divisions.map(division => division.id),
                        countryIds: countries.map(country => country.id),
                    },
                ));
        else
            Object.values(EasternAddressFormFields)
                .forEach(field => tempValidators[field as keyof typeof EasternAddressFormFields] = mapFieldsToValidators(
                    formData,
                    easternAddressFormValidatorOptionsMapFn,
                    field as keyof typeof EasternAddressFormFields,
                    easternAddressFormValidatorMap[field as keyof typeof EasternAddressFormFields],
                    undefined,
                    {
                        divisionIds: divisions.map(division => division.id),
                        countryIds: countries.map(country => country.id),
                    },
                ));

        return tempValidators;
    }, [formData, variant, divisions, countries]);

    const validateFieldValueWithDebounce = useDebounce(() => {
        const validator = validators[updatedField];
        const result = validator.validate();

        if (!result.isValid) {
            const message = t(result.messages.entries().next().value[0], result.messages.entries().next().value[1]);
            setFormData({
                ...formData,
                [updatedField]: { ...formData[updatedField], caption: message },
            });
        }

        const options: TFieldMediatorOptions<typeof WesternAddressFormFields | typeof EasternAddressFormFields> =
            variant === AddressVariant.Western ? {
                noValidations: [WesternAddressFormFields.Variant],
                optionalFields: [
                    WesternAddressFormFields.BuildingName,
                    WesternAddressFormFields.PoBoxNumber,
                ],
            } : {
                noValidations: [EasternAddressFormFields.Variant],
                optionalFields: [
                    EasternAddressFormFields.BuildingName,
                    EasternAddressFormFields.PoBoxNumber,
                    EasternAddressFormFields.Lane,
                    EasternAddressFormFields.Group,
                    EasternAddressFormFields.Quarter,
                    EasternAddressFormFields.Hamlet,
                    EasternAddressFormFields.Commute,
                    EasternAddressFormFields.Ward,
                    EasternAddressFormFields.District,
                    EasternAddressFormFields.Town,
                    EasternAddressFormFields.City,
                ],
            };

        const fieldsMediator = new FieldsMediator(validators, options);
        setIsFormValid(fieldsMediator.validateForm().isValid);
    }, [configs.debounceWaitDuration]);

    useEffect(() => {
        if (updatedField && formData[updatedField].value) validateFieldValueWithDebounce();
    }, [updatedField, formData]);

    const handleSubmit = useCallback(() => {
        if (!isFormValid) return;

        const addressData: IAddressData = createAddressData(variant, formData);

        if (action === ActionType.Add) surrogate(dispatch, sendRequestToAddNewAddress(profileId, addressData, authorization));
        else surrogate(dispatch, sendRequestToUpdateAddress(profileId, address!.id, addressData, authorization));
    }, [action, address, variant, formData]);

    return (
        <Grid container spacing={2} style={{marginBottom: '10px'}}>
            <Grid item xs={12}><Loading stage={Stages.SHOWCASE} /></Grid>


                <Grid item xs={12}>
                    <Flasher stage={Stages.SHOWCASE} message='This is an error' />
                </Grid>


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
                    disableSubmit={!isFormValid || isRequestBegun}
                    onSubmit={handleSubmit}
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
                    disableSubmit={!isFormValid || isRequestBegun}
                    onSubmit={handleSubmit}
                />
            )}
        </Grid>
    );
};

export default connect(mapStateToProps)(AddressForm);