import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import SocialIcons from 'src/components/atoms/SocialIcons/SocialIcons';
import useStyles from 'src/components/showcases/styles';

const SocialIconsShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Social Icons</h5>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>Inline view</Typography>
                <SocialIcons
                    variant='inline'
                    icons={[
                        {iconName: 'facebook'},
                        {iconName: 'google'},
                        {iconName: 'twitter'},
                        {iconName: 'instagram'},
                        {iconName: 'microsoft'},
                        {iconName: 'linkedin'},
                    ]}
                />
                <Box className={styles.code}>
                    <code>
                        {`<SocialIcons
                            variant='inline'
                            icons={[
                                {iconName: 'facebook'},
                                {iconName: 'google'},
                                {iconName: 'twitter'},
                                {iconName: 'instagram'},
                                {iconName: 'microsoft'},
                                {iconName: 'linkedin'},
                            ]}
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>Grid view</Typography>
                <SocialIcons
                    icons={[
                        {iconName: 'facebook'},
                        {iconName: 'google'},
                        {iconName: 'twitter'},
                        {iconName: 'instagram'},
                        {iconName: 'microsoft'},
                        {iconName: 'linkedin'},
                    ]}
                />
                <Box className={styles.code}>
                    <code>
                        {`<SocialIcons
                            icons={[
                                {iconName: 'facebook'},
                                {iconName: 'google'},
                                {iconName: 'twitter'},
                                {iconName: 'instagram'},
                                {iconName: 'microsoft'},
                                {iconName: 'linkedin'},
                            ]}
                        />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SocialIconsShowcase;
