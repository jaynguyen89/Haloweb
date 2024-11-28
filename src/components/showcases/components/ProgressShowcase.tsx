import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Progress, { LabelProgress } from 'src/components/molecules/StatusIndicators/Progress';
import useStyles from 'src/components/showcases/styles';

const ProgressShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <h5>Progress variants</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Default</Typography>
                <Progress stage='showcase' color='secondary' />
                <Box className={styles.code}>
                    <code>
                        {`<Progress stage='showcase' color='secondary' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>With label</Typography>
                <LabelProgress stage='showcase' progress={75} color='secondary' />
                <Box className={styles.code}>
                    <code>
                        {`<LabelProgress stage='showcase' progress={75} color='secondary' />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProgressShowcase;
