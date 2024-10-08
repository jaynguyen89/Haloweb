import React from 'react';
import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material';
import { useIsStageIncluded } from 'src/hooks/useStage';

export type TSpinner = Omit<CircularProgressProps, 'variant'> & {
    stage: string,
};

const Spinner = ({
    stage,
    color,
    size = 100,
    thickness = 2,
}: TSpinner) => {
    const visible = stage === 'showcase' || useIsStageIncluded(stage);
    if (!visible) return null;

    return (
        <CircularProgress
            variant='indeterminate'
            color={color}
            size={size}
            thickness={thickness}
        />
    );
};

export default Spinner;

export type TLabelSpinner = TSpinner & {
    stage: string,
    progress: number,
    textVariant?: string,
};

export const LabelSpinner = ({
    stage,
    progress,
    color,
    size = 100,
    thickness = 2,
    textVariant = 'h6',
}: TLabelSpinner) => {
    const visible = stage === 'showcase' || useIsStageIncluded(stage);
    if (!visible) return null;

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant='determinate'
                color={color}
                size={size}
                thickness={thickness}
                value={progress}
            />
            
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
                    variant={textVariant as any}
                    component='div'
                    color='text.secondary'
                >{progress}%</Typography>
            </Box>
        </Box>
    );
};
