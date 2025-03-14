import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { IEasternAddress, IUnifiedAddress, IWesternAddress } from 'src/models/Address';
import { ActionType, AddressVariant } from 'src/models/enums/apiEnums';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { defaultAddress, getDefaultUnifiedAddress } from 'src/pages/ProfilePage/ProfileSettings/AddressBook/utilities';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import _cloneDeep from 'lodash/cloneDeep';
import WesternAddressForm from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressForm/WesternAddressForm';
import EasternAddressForm from 'src/pages/ProfilePage/ProfileSettings/AddressBook/AddressForm/EasternAddressForm';
import { connect, useDispatch } from 'react-redux';
import { TRootState } from 'src/redux/reducers';
import { surrogate } from 'src/utilities/otherUtilities';
import { sendRequestToGetLocalityData } from 'src/redux/actions/localityActions';
import useAuthorization from 'src/hooks/useAuthorization';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';

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

    const [formData, setFormData] = useState<IUnifiedAddress>(defaultAddress);

    useEffect(() => {
        surrogate(dispatch, sendRequestToGetLocalityData(authorization));
    }, []);

    useEffect(() => {
        if (action === ActionType.Add) {
            setFormData(defaultAddress);
            return;
        }

        setFormData(getDefaultUnifiedAddress(address as IEasternAddress | IWesternAddress));
    }, [action, address]);

    const { divisions, countries } = useMemo(() => {
        const countries = localities.map(locality => locality.country);

        if (formData.countryId === '') return { divisions: [], countries };

        const localityByCountryId = localities.filter(locality => locality.country.id === formData.countryId);
        return { divisions: localityByCountryId[0].divisions, countries };
    }, [formData, localities]);

    const handleVariantSelect = (variant: AddressVariant) => {
        if (variant === AddressVariant.Western) {
            setFormData(defaultAddress);
            return;
        }

        const clone = _cloneDeep(defaultAddress);
        clone.variant = AddressVariant.Eastern;
        setFormData(clone);
    };

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

            {formData.variant === AddressVariant.Western && (
                <WesternAddressForm
                    id={id}
                    data={formData}
                    isLoadingData={isLoadingLocalities}
                    divisions={divisions}
                    countries={countries}
                />
            )}

            {formData.variant === AddressVariant.Eastern && (
                <EasternAddressForm
                    id={id}
                    data={formData}
                    isLoadingData={isLoadingLocalities}
                    divisions={divisions}
                    countries={countries}
                />
            )}
        </Grid>
    );
};

export default connect(mapStateToProps)(AddressForm);