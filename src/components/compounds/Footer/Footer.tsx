import Typography from '@mui/material/Typography';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import useStyles, { footerSx } from 'src/components/compounds/Footer/styles';

const Footer = () => {
    const theme = useTheme();
    const styles = useStyles();

    return (
        <Box sx={{ ...footerSx }}>
            <Container maxWidth='xl'>
                <Grid container spacing={{ md: 2, xs: 1 }}>
                    <Grid md={8} xs={12}>
                        <Typography variant='h5' className={styles.brand}>
                            Halo Marketplace
                        </Typography>
                        <Typography variant='body2'>
                            Initialized since July 2023 by <b>Jay Nguyen</b>
                        </Typography>
                    </Grid>
                    <Grid md={4} xs={12}>
                        <Typography variant='body2'>
                            Online Commerce platform universalizing the sales of various product kinds and selling formats.
                            For Web, Mobile (iOS + Android), Windows.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
