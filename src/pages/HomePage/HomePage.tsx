import Box from '@mui/material/Box';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import Typography from '@mui/material/Typography';
import { HomeBackgroundImg } from 'src/assets/images';
import Page from 'src/components/atoms/Page/Page';
import useStyles, { textSx } from 'src/pages/HomePage/styles';
import { removeStage } from 'src/redux/actions/stageActions';
import Stages from 'src/models/enums/stage';

const HomePage = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    useEffect(() => {
        dispatch(removeStage(Stages.HIDE_SITE_HEADER) as unknown as AnyAction);
    }, []);

    return (
        <Page key='homepage' pageStyle={{ position: 'relative' }}>
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
