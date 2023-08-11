import { Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import Spinner, { LabelSpinner } from 'src/components/molecules/StatusIndicators/Spinner';

const SpinnerShowcase = () => {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Spinners</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Default</Typography>
                <Spinner stage='showcase' color='secondary' />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>With Label</Typography>
                <LabelSpinner stage='showcase' progress={75} color='secondary' />
            </Grid>
        </Grid>
    );
};

export default SpinnerShowcase;
