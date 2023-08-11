import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import Toast from 'src/components/molecules/StatusIndicators/Toast';

const ToastShowcase = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Toasts</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Default: see bottom right corner</Typography>
                <Toast stage='showcase' message={'This is a Toast.'} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Custom: see bottom left corner</Typography>
                <Toast
                    stage='showcase'
                    message={'This is a Toast.'}
                    color='error'
                    position={{vertical: 'bottom', horizontal: 'left'}}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Custom: see upper left corner</Typography>
                <Toast
                    stage='showcase'
                    message={'This is a Toast.'}
                    color='success'
                    position={{vertical: 'top', horizontal: 'left'}}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Custom: see upper right corner</Typography>
                <Toast
                    stage='showcase'
                    message={'This is a Toast.'}
                    color='warning'
                    position={{vertical: 'top', horizontal: 'right'}}
                />
            </Grid>
        </Grid>
    );
};

export default ToastShowcase;
