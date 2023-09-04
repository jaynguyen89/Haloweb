import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import NumberCell from 'src/components/atoms/NumberCell/NumberCell';

const NumberCellShowcase = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Number Cell</h5>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Default 6 cells</Typography>
                <NumberCell />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Specify the number of cells</Typography>
                <NumberCell numOfCells={10} />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Left align</Typography>
                <NumberCell numOfCells={4} align='left' />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Right align</Typography>
                <NumberCell numOfCells={4} align='right' />
            </Grid>
        </Grid>
    );
};

export default NumberCellShowcase;
