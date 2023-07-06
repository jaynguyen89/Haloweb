import React, { FunctionComponent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { pageSx, containerSx } from 'src/components/atoms/Page/styles';

const Page: FunctionComponent<{
    children: ReactNode,
    styles?: React.CSSProperties,
}> = ({
    children,
    styles,
}) => {
    return (
        <Box sx={pageSx} style={styles}>
            <Container maxWidth='xl' sx={containerSx}>
                {children}
            </Container>
        </Box>
    );
};

export default Page;
