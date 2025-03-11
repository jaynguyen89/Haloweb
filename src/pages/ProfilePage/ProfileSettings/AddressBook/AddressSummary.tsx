import React from 'react';
import Grid from '@mui/material/Grid';
import ParagraphSkeleton from 'src/components/atoms/Skeletons/ParagraphSkeleton';
import { Chip } from '@mui/material';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import OtherHousesRounded from '@mui/icons-material/OtherHousesRounded';
import RepartitionRoundedIcon from '@mui/icons-material/RepartitionRounded';
import { IAddressBook, IFineAddress } from 'src/models/AddressBook';
import { useTranslation } from 'react-i18next';

type TAddressSummaryProps = {
    id: string,
    addressBook: IAddressBook | null,
};

const AddressSummary = ({
    id,
    addressBook,
}: TAddressSummaryProps) => {
    const { t } = useTranslation();

    return (
        <>
            {!Boolean(addressBook) && (
                <Grid item xs={12}>
                    <ParagraphSkeleton />
                </Grid>
            )}

            {Boolean(addressBook) && (
                <>
                    {addressBook!.addresses.map((fineAddress: IFineAddress) => {
                        if (!fineAddress.isForDelivery && !fineAddress.isForPostage && !fineAddress.isForReturn)
                            return undefined;

                        return (
                            <Grid key={fineAddress.id} item lg={4} md={6} sm={6} xs={12}>
                                {fineAddress.isForPostage && (
                                    <Chip
                                        icon={<LocalShippingRounded />}
                                        label={t(`profile-page.${id}.shipping-label`)}
                                        color='secondary'
                                    />
                                )}

                                {fineAddress.isForDelivery && (
                                    <Chip
                                        icon={<OtherHousesRounded />}
                                        label={t(`profile-page.${id}.delivery-label`)}
                                        color='info'
                                    />
                                )}

                                {fineAddress.isForReturn && (
                                    <Chip
                                        icon={<RepartitionRoundedIcon />}
                                        label={t(`profile-page.${id}.return-label`)}
                                        color='warning'
                                    />
                                )}

                                <p className='addressText'>{fineAddress.address.normalizedAddress}</p>
                            </Grid>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default AddressSummary;