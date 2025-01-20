import React from 'react';
import { IconButton, TextField, TextFieldProps, useTheme } from '@mui/material';
import FaIcon from '../../atoms/FaIcon';
import 'src/components/molecules/SavableInput/styles.scss';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

type SavableInputProps = TextFieldProps & {
    oldValue?: string,
    onClickSaveBtn?: () => void,
    status?: {
        saving: boolean,
        success: boolean,
    },
};

const SavableInput = ({
    oldValue,
    onClickSaveBtn,
    status,
    ...textFieldProps
}: SavableInputProps) => {
    const theme = useTheme();
    const { saving, success } = status ?? {};

    return (
        <div className='wrapper'>
            <TextField {...textFieldProps} />

            {oldValue !== textFieldProps.value && status === undefined && (
                <IconButton className='save-btn' onClick={onClickSaveBtn}>
                    <FaIcon wrapper='fa' t='obj' ic={faFloppyDisk} />
                </IconButton>
            )}

            {status !== undefined && saving && (
                <div className='status'>
                    <FaIcon wrapper='i' ic='circle-notch' animation='spin' color={theme.palette.secondary.main} />
                </div>
            )}

            {status !== undefined && success && !saving && (
                <div className='status'>
                    <FaIcon wrapper='i' ic='check-double' color={theme.palette.success.main} />
                </div>
            )}

            {status !== undefined && !success && !saving && (
                <div className='status'>
                    <FaIcon wrapper='i' ic='circle-xmark' color={theme.palette.error.main} />
                </div>
            )}
        </div>
    );
};

export default SavableInput;