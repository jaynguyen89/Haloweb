import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { CircularSkeleton, RectangularSkeleton, RoundedSkeleton, TextSkeleton } from 'src/components/atoms/Skeletons/Skeletons';
import useStyles from 'src/components/showcases/styles';

const PreviewShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Fundamental components</h5>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body1'>Text skeleton</Typography>
                <TextSkeleton />
                <Box className={styles.code}>
                    <code>
                        {`<TextSkeleton />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body1'>Rounded box skeleton</Typography>
                <RoundedSkeleton />
                <Box className={styles.code}>
                    <code>
                        {`<RoundedSkeleton />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body1'>Rectangular skeleton</Typography>
                <RectangularSkeleton />
                <Box className={styles.code}>
                    <code>
                        {`<RectangularSkeleton />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body1'>Circular skeleton</Typography>
                <CircularSkeleton />
                <Box className={styles.code}>
                    <code>
                        {`<CircularSkeleton />`}
                    </code>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <h5>Previews</h5>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Listing card preview</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Listing description preview</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Listing list preview</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>User card preview</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Devices preview</Typography>
            </Grid>
        </Grid>
    );
};

export default PreviewShowcase;
