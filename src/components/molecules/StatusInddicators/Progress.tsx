import React from 'react';
import { useIsStageIncluded } from 'src/hooks/useStage';
import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material';

type TProgress = LinearProgressProps & {
    stage: string,
};

const Progress = ({
    stage,
    color,
    sx,
}: TProgress) => {
    const visible = useIsStageIncluded(stage);
    if (!visible) return null;

    return (
        <LinearProgress
            color={color}
            sx={sx}
        />
    );
};

export default Progress;

type TLabelProgress = TProgress & {
    progress: number,
};

export const LabelProgress = ({
    stage,
    progress,
    color,
    sx,
}: TLabelProgress) => {
    const visible = useIsStageIncluded(stage);
    if (!visible) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant='determinate'
                    value={progress}
                    color={color}
                    sx={sx}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant='body2' color='text.secondary'>
                    {progress}%
                </Typography>
            </Box>
        </Box>
    );
};
