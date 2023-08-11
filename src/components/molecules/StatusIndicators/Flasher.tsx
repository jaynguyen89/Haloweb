import React from 'react';
import { Alert, AlertProps, Collapse, CollapseProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useIsStageIncluded } from 'src/hooks/useStage';
import { removeStage } from 'src/redux/actions/stageActions';

type TFlasher = CollapseProps & AlertProps & {
    message: string,
    stage: string,
};

const Flasher = ({
    message,
    stage,
    orientation = 'vertical',
    severity = 'info',
    variant = 'standard',
    sx = {
        mb: 2,
    },
}: TFlasher) => {
    const visible = stage === 'showcase' || useIsStageIncluded(stage);

    return (
        <Collapse in={visible} orientation={orientation}>
            <Alert
                action={
                    <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => stage !== 'showcase' && removeStage(stage)}
                    >
                        <CloseIcon fontSize='inherit' />
                    </IconButton>
                }
                sx={sx}
                severity={severity}
                variant={variant}
            >
                {message}
            </Alert>
        </Collapse>
    );
};

export default Flasher;
