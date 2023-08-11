import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';

const FlasherShowcase = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Flasher variants</h5>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (Standard)</Typography>
                <Flasher
                    message='This is an information Flasher.'
                    stage='showcase'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (Filled)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    variant='filled'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (Outlined)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    variant='outlined'
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Warning (Standard)</Typography>
                <Flasher
                    message='This is a warning Flasher.'
                    stage='showcase'
                    severity='warning'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Warning (Filled)</Typography>
                <Flasher
                    message='This is a warning Flasher.'
                    stage='showcase'
                    severity='warning'
                    variant='filled'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Warning (Outlined)</Typography>
                <Flasher
                    message='This is a warning Flasher.'
                    stage='showcase'
                    severity='warning'
                    variant='outlined'
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Error (Standard)</Typography>
                <Flasher
                    message='This is an error Flasher.'
                    stage='showcase'
                    severity='error'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Error (Filled)</Typography>
                <Flasher
                    message='This is an error Flasher.'
                    stage='showcase'
                    severity='error'
                    variant='filled'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Error (Outlined)</Typography>
                <Flasher
                    message='This is an error Flasher.'
                    stage='showcase'
                    severity='error'
                    variant='outlined'
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Success (Standard)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    severity='success'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Success (Filled)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    severity='success'
                    variant='filled'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Success (Outlined)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    severity='success'
                    variant='outlined'
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (horizontal)</Typography>
                <Flasher
                    message='This is an info Flasher.'
                    stage='showcase'
                    orientation='horizontal'
                />
            </Grid>
        </Grid>
    );
};

export default FlasherShowcase;
