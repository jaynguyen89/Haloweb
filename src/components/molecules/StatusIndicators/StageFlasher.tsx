import { Alert, Collapse, IconButton } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetStageByName } from 'src/hooks/useStage';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { TFlasher } from 'src/components/molecules/StatusIndicators/Flasher';
import { removeStage } from 'src/redux/actions/stageActions';
import { AnyAction } from 'redux';

const StageFlasher = ({
    stage,
    orientation = 'vertical',
    variant = 'standard',
    sx = {
        mb: 2,
    },
    onClose,
}: Omit<TFlasher, 'message' | 'severity'> & {
    onClose?: () => void,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const stageData = useGetStageByName(stage);
    const visible = stage === 'showcase' || Boolean(stageData);

    if (stageData === undefined) return <></>;

    const {
        type,
        message,
        messageParams,
    } = stageData;

    const handleHideFlasher = () => onClose ? onClose() : dispatch(removeStage(stage) as unknown as AnyAction);

    return (
        <Collapse in={visible} orientation={orientation}>
            <Alert
                action={
                    <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={handleHideFlasher}
                    >
                        <CloseIcon fontSize='inherit' />
                    </IconButton>
                }
                sx={sx}
                severity={type}
                variant={variant}
            >
                {t(message, messageParams)}
            </Alert>
        </Collapse>
    );
};

export default StageFlasher;
