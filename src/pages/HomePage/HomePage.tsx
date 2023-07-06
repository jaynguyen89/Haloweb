import Box from '@mui/material/Box';
import React from 'react';
import Typography from '@mui/material/Typography';
import { HomeBackgroundImg } from 'src/assets/images';
import Page from 'src/components/atoms/Page/Page';
import useStyles, { textSx } from 'src/pages/HomePage/styles';

const HomePage = () => {
    const styles = useStyles();

    return (
        <Page key='homepage' styles={{ position: 'relative' }}>
            <img src={HomeBackgroundImg} alt='home-background' className={styles.homeBg} />
            <Box sx={textSx}>
                <Typography className={styles.heading}>
                    Home Page is pending
                </Typography>
                <Typography className={styles.description}>
                    Need to look around for Home Page inspirations, will get back when more features have been developed,
                </Typography>
            </Box>
        </Page>
    );
};

export default HomePage;
