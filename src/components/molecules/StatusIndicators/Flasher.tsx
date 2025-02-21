import { useTheme } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { Alert, AlertColor, AlertProps, Collapse, CollapseProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useGetStageByName, useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import { removeStage } from 'src/redux/actions/stageActions';
import { surrogate } from 'src/utilities/otherUtilities';

export type TFlasher = CollapseProps & AlertProps & {
    stage: string,
    message?: string,
    messageParams?: object,
    onClose?: () => void,
    showAction?: boolean,
};

const Flasher = ({
    stage,
    message,
    messageParams,
    orientation = 'vertical',
    severity = 'info',
    variant = 'standard',
    sx = {
        mb: 2,
    },
    onClose,
    showAction = true,
}: TFlasher) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const theme = useTheme();
    const visible = stage === Stages.SHOWCASE || useIsStageIncluded(stage);
    const stageFromStore = useGetStageByName(stage);

    message = useMemo(() => {
        if (stage === Stages.SHOW_FLASHER_SERVER_ERROR && stageFromStore)
            return stageFromStore.message;

        return message;
    }, [stage, stageFromStore]);

    severity = useMemo(() => {
        if (stage === Stages.SHOW_FLASHER_SERVER_ERROR && stageFromStore)
            return stageFromStore.type as AlertColor;

        return severity;
    }, [stage, stageFromStore]);

    const handleHideFlasher = () => onClose ? onClose() : surrogate(dispatch, removeStage(stage));

    return (
        <Collapse in={visible} orientation={orientation}>
            <Alert
                action={
                    showAction ?<IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => stage !== 'showcase' && handleHideFlasher()}
                    >
                        <CloseIcon fontSize='inherit' />
                    </IconButton> : undefined
                }
                sx={sx}
                severity={severity}
                variant={variant}
            >
                <span style={{color: theme.palette[severity].main}}>{t(message as string, {...messageParams})}</span>
            </Alert>
        </Collapse>
    );
};

export default Flasher;
