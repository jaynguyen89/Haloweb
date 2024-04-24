import { Alert, Collapse, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetStageByName } from 'src/hooks/useStage';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { TFlasher } from 'src/components/molecules/StatusIndicators/Flasher';
import { removeStage } from 'src/redux/actions/stageActions';
import { surrogate } from 'src/utilities/otherUtilities';

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
    const theme = useTheme();
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

    const handleHideFlasher = () => onClose ? onClose() : surrogate(dispatch, removeStage(stage));

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
                <span style={{color: theme.palette[type ?? 'info'].main}}>{t(message as string, {...messageParams})}</span>
            </Alert>
        </Collapse>
    );
};

export default StageFlasher;
