import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import PinCell from 'src/components/atoms/PinCell/PinCell';
import useStyles from 'src/components/showcases/styles';

const PinCellShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Number Cell</h5>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Default 6 cells</Typography>
                <PinCell onChange={(pin) => console.log(pin)} />
                <Box className={styles.code}>
                    <code>
                        {`<PinCell onChange={(pin) => console.log(pin)} />`}
                    </code>
                </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Specify the number of cells</Typography>
                <PinCell numOfCells={10} onChange={(pin) => console.log(pin)} />
                <Box className={styles.code}>
                    <code>
                        {`<PinCell numOfCells={10} onChange={(pin) => console.log(pin)} />`}
                    </code>
                </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Left align</Typography>
                <PinCell numOfCells={4} onChange={(pin) => console.log(pin)} align='left' />
                <Box className={styles.code}>
                    <code>
                        {`<PinCell numOfCells={4} onChange={(pin) => console.log(pin)} align='left' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography variant='body1'>Right align</Typography>
                <PinCell numOfCells={5} onChange={(pin) => console.log(pin)} align='right' />
                <Box className={styles.code}>
                    <code>
                        {`<PinCell numOfCells={5} onChange={(pin) => console.log(pin)} align='right' />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PinCellShowcase;
