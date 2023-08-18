import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';

const IconButton = () => {
    return (
        <Box>
            <CountryFlag isoCountryCode='vn' />
            <Button variant='contained'>Button</Button>
        </Box>
    );
};

export default IconButton;
