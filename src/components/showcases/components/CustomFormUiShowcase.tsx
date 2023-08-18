import Grid from '@mui/material/Grid';
import React from 'react';
import IconSelect from 'src/components/atoms/IconSelect/IconSelect';

const CustomFormUiShowcase = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Previews</h5>
            </Grid>
            <Grid item xs={6} md={4}>
                <IconSelect />
            </Grid>
        </Grid>
    );
};

export default CustomFormUiShowcase;
