import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import useStyles from 'src/components/showcases/styles';

const CountryFlagsShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Previews</h5>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Typography variant='body1'>Rectangle (default)</Typography>
                <CountryFlag isoCountryCode='au' />
                <Box className={styles.code}>
                    <code>
                        {`<CountryFlag isoCountryCode='au' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Typography variant='body1'>Square</Typography>
                <CountryFlag isoCountryCode='au' variant='square' />
                <Box className={styles.code}>
                    <code>
                        {`<CountryFlag isoCountryCode='au' variant='square' />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default CountryFlagsShowcase;
