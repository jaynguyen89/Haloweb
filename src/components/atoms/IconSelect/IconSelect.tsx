import { Box, FormControl, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React from 'react';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';

const IconSelect = () => {
    return (
        <Box>
            <CountryFlag isoCountryCode='vn' />
            <FormControl size='small' fullWidth>
                <InputLabel id='language-select-label'>Site Language</InputLabel>
                <Select
                    labelId='language-select-label'
                    label='Site Language'
                    value='en'
                >
                    <MenuItem value='vi'>
                        <Typography variant='subtitle2'>Vietnamese</Typography>
                    </MenuItem>
                    <MenuItem value='en'>
                        <Typography variant='subtitle2'>English</Typography>
                    </MenuItem>
                    <MenuItem value='jp'>
                        <Typography variant='subtitle2'>Japanese</Typography>
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default IconSelect;
