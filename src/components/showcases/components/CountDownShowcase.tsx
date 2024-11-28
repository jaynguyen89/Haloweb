import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import CountDown from 'src/components/atoms/CountDown/CountDown';
import useStyles from 'src/components/showcases/styles';

const CountDownShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Count Down</h5>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='body1'>Displayed as Text (default)</Typography>
                <CountDown duration={300} />
                <Box className={styles.code}>
                    <code>
                        {`<CountDown duration={300} />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='body1'>Displayed as Box</Typography>
                <CountDown duration={3600} display='box' />
                <Box className={styles.code}>
                    <code>
                        {`<CountDown duration={3600} display='box' />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default CountDownShowcase;
