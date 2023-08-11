import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import SocialIcons from 'src/components/atoms/SocialIcons/SocialIcons';

const SocialIconsShowcase = () => {
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
            </Grid>
        </Grid>
    );
};

export default SocialIconsShowcase;
