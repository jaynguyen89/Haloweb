import React, { ChangeEvent, useEffect, useState } from 'react';
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

type TAddressFormProps = {
    id: string,
    action: ActionType,
    address: IEasternAddress | IWesternAddress | null,
};

const AddressForm = ({
    id,
    action,
    address,
}: TAddressFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<IUnifiedAddress>(defaultAddress);

    useEffect(() => {
        if (action === ActionType.Add) {
            setFormData(defaultAddress);
            return;
        }

        setFormData(getDefaultUnifiedAddress(address as IEasternAddress | IWesternAddress));
    }, [action, address]);

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
                <WesternAddressForm id={id} data={formData} />
            )}

            {formData.variant === AddressVariant.Eastern && (
                <EasternAddressForm id={id} data={formData} />
            )}
        </Grid>
    );
};

export default AddressForm;