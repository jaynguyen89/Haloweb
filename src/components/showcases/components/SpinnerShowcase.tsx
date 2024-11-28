import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Spinner, { LabelSpinner } from 'src/components/molecules/StatusIndicators/Spinner';
import useStyles from 'src/components/showcases/styles';

const SpinnerShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Spinners</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Default</Typography>
                <Spinner stage='showcase' color='secondary' />
                <Box className={styles.code}>
                    <code>
                        {`<Spinner stage='showcase' color='secondary' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>With Label</Typography>
                <LabelSpinner stage='showcase' progress={75} color='secondary' />
                <Box className={styles.code}>
                    <code>
                        {`<LabelSpinner stage='showcase' progress={75} color='secondary' />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SpinnerShowcase;
