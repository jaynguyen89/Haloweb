import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import Progress, { LabelProgress } from 'src/components/molecules/StatusIndicators/Progress';

const ProgressShowcase = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <h5>Progress variants</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Default</Typography>
                <Progress stage='showcase' color='secondary' />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>With label</Typography>
                <LabelProgress stage='showcase' progress={75} color='secondary' />
            </Grid>
        </Grid>
    );
};

export default ProgressShowcase;
