import React from 'react';
import Grid from '@mui/material/Grid';
import { RoundedSkeleton } from './Skeletons';

const FormSkeleton = () => {
    return (
        <Grid container spacing={2}>
            <Grid item md={4} sm={12}>
                <RoundedSkeleton />
            </Grid>
            <Grid item md={4} sm={12}>
                <RoundedSkeleton />
            </Grid>
            <Grid item md={4} sm={12}>
                <RoundedSkeleton />
            </Grid>
            <Grid item md={8} sm={12}>
                <RoundedSkeleton />
            </Grid>
            <Grid item md={4} sm={12}>
                <RoundedSkeleton />
            </Grid>
        </Grid>
    );
};

export default FormSkeleton;