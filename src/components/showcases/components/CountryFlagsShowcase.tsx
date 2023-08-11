import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';

const CountryFlagsShowcase = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Previews</h5>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Rectangle (default)</Typography>
                <CountryFlag isoCountryCode='au' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Square</Typography>
                <CountryFlag isoCountryCode='au' variant='square' />
            </Grid>
        </Grid>
    );
};

export default CountryFlagsShowcase;
