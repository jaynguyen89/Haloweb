import React from 'react';
import { Alert, AlertProps, IconButton, Snackbar, SnackbarOrigin, SnackbarProps } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useIsStageIncluded } from 'src/hooks/useStage';
import { removeStage } from 'src/redux/actions/stageActions';
import CloseIcon from '@mui/icons-material/Close';
import configs from 'src/commons/configs';
import { surrogate } from 'src/utilities/otherUtilities';

export type TToast = SnackbarProps & AlertProps & {
    stage: string,
    message: string,
    position?: SnackbarOrigin,
};

const Toast = ({
    stage,
    message,
    severity = 'info',
    sx = { width: '100%' },
    autoHideDuration = configs.statusIndicatorsTimeout,
    position = { vertical: 'bottom', horizontal: 'right' },
    ...rest
}: TToast) => {
    const dispatch = useDispatch();
    const visible = stage === 'showcase' || useIsStageIncluded(stage);

    const handleHideToast = () => surrogate(dispatch, removeStage(stage));

    return (
        <Snackbar
            open={visible}
            autoHideDuration={autoHideDuration}
            onClose={autoHideDuration ? () => handleHideToast() : undefined}
            anchorOrigin={position}
            {...rest}
        >
            <Alert
                action={
                    <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => stage !== 'showcase' && handleHideToast()}
                    >
                        <CloseIcon fontSize='inherit' />
                    </IconButton>
                }
                sx={sx}
                severity={severity}
                {...rest}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
