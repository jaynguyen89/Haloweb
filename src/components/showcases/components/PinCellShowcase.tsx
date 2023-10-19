import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import PinCell from 'src/components/atoms/PinCell/PinCell';

const PinCellShowcase = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Number Cell</h5>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Default 6 cells</Typography>
                <PinCell onChange={(pin) => console.log(pin)} />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Specify the number of cells</Typography>
                <PinCell numOfCells={10} onChange={(pin) => console.log(pin)} />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Left align</Typography>
                <PinCell numOfCells={4} onChange={(pin) => console.log(pin)} align='left' />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Right align</Typography>
                <PinCell numOfCells={4} onChange={(pin) => console.log(pin)} align='right' />
            </Grid>
        </Grid>
    );
};

export default PinCellShowcase;
