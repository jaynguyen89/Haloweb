import React, { FunctionComponent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { pageSx, containerSx } from 'src/components/atoms/Page/styles';

const Page: FunctionComponent<{
    children: ReactNode,
    pageStyle?: React.CSSProperties,
    pageClassName?: string,
    containerStyle?: React.CSSProperties,
    containerClassName?: string,
}> = ({
    children,
    pageStyle,
    pageClassName,
    containerStyle,
    containerClassName,
}) => {
    return (
        <Box sx={pageSx} style={pageStyle} className={pageClassName}>
            <Container
                maxWidth='xl'
                sx={containerSx}
                style={containerStyle}
                className={containerClassName}
            >
                {children}
            </Container>
        </Box>
    );
};

export default Page;
