import { Chip, FormControl, InputLabel, Select, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    AfterpayLogoImg,
    AlipayLogoImg,
    BankCardLogoImg,
    PaypalLogoImg,
    ZalopayLogoImg,
    ZippayLogoImg,
} from 'src/assets/images';
import useStyles from 'src/pages/ProfilePage/styles';

type TPaymentMethodsProps = {
    id: string,
};

const paymentMethods = [
    {
        id: 'bank-card',
        image: BankCardLogoImg,
    },
    {
        id: 'paypal',
        image: PaypalLogoImg,
    },
    {
        id: 'alipay',
        image: AlipayLogoImg,
    },
    {
        id: 'zippay',
        image: ZippayLogoImg,
    },
    {
        id: 'afterpay',
        image: AfterpayLogoImg,
    },
    {
        id: 'zalopay',
        image: ZalopayLogoImg,
    },
];

const PaymentMethods = ({
    id,
}: TPaymentMethodsProps) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={styles.paymentMethods}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <Grid container spacing={4}>
                        <Grid item md={4} sm={6} xs={12}>
                            <div className='payment-wrapper'>
                                <Chip size='small' label={t(`profile-page.${id}.bank-card`)} />
                                <Chip size='small' color='secondary' label={t(`profile-page.${id}.primary-payment`)} style={{marginLeft: '0.5rem'}} />
                                <div className='payment-details'>
                                    <p><b>{t(`profile-page.${id}.card-holder`)}:</b> John Doe</p>
                                    <p><b>{t(`profile-page.${id}.card-number`)}:</b> 1234 5678 9012 3456</p>
                                    <p><b>{t(`profile-page.${id}.expiry-date`)}:</b> 22/33</p>
                                    <p><b>CVV:</b> ***</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <div className='payment-wrapper'>
                                <Chip size='small' label={t(`profile-page.${id}.paypal`)} />
                                <div className='payment-details'>
                                    <p><b>{t(`profile-page.${id}.email-address`)}:</b> john.doe123@gmail.com</p>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4} sm={8} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id='payment-method-select-label'>
                            {t(`profile-page.${id}.payment-method-select-label`)}
                        </InputLabel>
                        <Select
                            variant='outlined'
                            labelId='payment-method-select-label'
                            label={t(`profile-page.${id}.payment-method-select-label`)}
                        >
                            {paymentMethods.map(({id: paymentId, image}) => (
                                <MenuItem key={paymentId} value={paymentId}>
                                    <img style={{width: '30px', marginRight: '1rem'}} alt={paymentId} src={image} />
                                    {t(`profile-page.${id}.${paymentId}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

export default PaymentMethods;
