import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Loading from 'src/components/molecules/StatusIndicators/Loading/Loading';
import useStyles from 'src/components/showcases/styles';

const LoadingShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Loading variants</h5>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Elastic (default)</Typography>
                <Loading stage='showcase' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Falling</Typography>
                <Loading stage='showcase' variant='falling' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='falling' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Pulsing</Typography>
                <Loading stage='showcase' variant='pulsing' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='pulsing' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Flashing</Typography>
                <Loading stage='showcase' variant='flashing' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='flashing' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Colliding</Typography>
                <Loading stage='showcase' variant='colliding' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='colliding' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Rotating</Typography>
                <Loading stage='showcase' variant='rotating' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='rotating' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Jumping</Typography>
                <Loading stage='showcase' variant='jumping' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='jumping' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Circling</Typography>
                <Loading stage='showcase' variant='circling' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='circling' />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <Typography variant='body1'>Floating</Typography>
                <Loading stage='showcase' variant='floating' />
                <Box className={styles.code}>
                    <code>
                        {`<Loading stage='showcase' variant='floating' />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoadingShowcase;
