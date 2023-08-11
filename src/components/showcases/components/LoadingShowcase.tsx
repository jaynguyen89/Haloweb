import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';

const LoadingShowcase = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Loading variants</h5>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Elastic (default)</Typography>
                <Loading stage='showcase' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Falling</Typography>
                <Loading stage='showcase' variant='falling' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Pulsing</Typography>
                <Loading stage='showcase' variant='pulsing' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Flashing</Typography>
                <Loading stage='showcase' variant='flashing' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Colliding</Typography>
                <Loading stage='showcase' variant='colliding' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Rotating</Typography>
                <Loading stage='showcase' variant='rotating' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Jumping</Typography>
                <Loading stage='showcase' variant='jumping' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Circling</Typography>
                <Loading stage='showcase' variant='circling' />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Floating</Typography>
                <Loading stage='showcase' variant='floating' />
            </Grid>
        </Grid>
    );
};

export default LoadingShowcase;
