import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { OnlineShoppingImg, ShoppingBagsImg, ShoppingJoyImg, ShoppingMallsImg } from 'src/assets/images';
import { headerSx } from 'src/components/compounds/Header/styles';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Stages from 'src/models/enums/stage';
import { setStage } from 'src/redux/actions/stageActions';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'Shop millions of products with Halo with filterings for categories, locations and item specifics to match your styles',
        imgPath: ShoppingJoyImg,
    },
    {
        label: 'Get your orders delivered to you in a safest and fastest manner by selecting your preferred method of shipping',
        imgPath: ShoppingBagsImg,
    },
    {
        label: 'Become a seller on Halo, we offer a great range of customizabilities for every type of products',
        imgPath: ShoppingMallsImg,
    },
    {
        label: 'Reach worldwide customers without hassles and worries by our secure payment methods and customer protection policies',
        imgPath: OnlineShoppingImg,
    },
];

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    useEffect(() => {
        if (window.location.pathname !== '/')
            dispatch(setStage({
                name: Stages.HIDE_SITE_HEADER,
                canClear: false,
            }) as unknown as AnyAction);
    }, [window.location.pathname]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={headerSx}>
            <Container maxWidth='xl'>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                        bgcolor: 'background.default',
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    <Typography>{images[activeStep].label}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component='img'
                                    sx={{
                                        height: 255,
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={step.imgPath}
                                    alt={step.label}
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position='static'
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size='small'
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Container>
        </Box>
    );
};

export default Header;
