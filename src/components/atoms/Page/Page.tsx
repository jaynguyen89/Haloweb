import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { FunctionComponent, ReactElement } from 'react';
import { containerSx } from 'src/components/atoms/ContentContainer/styles';

const ContentContainer: FunctionComponent<{ children: ReactElement}> = ({ children }) => {
    return (
        <Box sx={containerSx}>
            <Container maxWidth='xl'>
                {children}
            </Container>
        </Box>
    );
};

export default ContentContainer;
