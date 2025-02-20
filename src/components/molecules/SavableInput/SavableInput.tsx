import React from 'react';
import { IconButton, TextField, TextFieldProps, useTheme } from '@mui/material';
import FaIcon from '../../atoms/FaIcon';
import 'src/components/molecules/SavableInput/styles.scss';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

type SavableInputProps = TextFieldProps & {
    oldValue?: string | null,
    disableSaveBtn?: boolean,
    onClickSaveBtn?: () => void,
    status?: {
        saving: boolean,
        success: boolean,
    },
};

const SavableInput = ({
    oldValue,
    disableSaveBtn,
    onClickSaveBtn,
    status,
    ...textFieldProps
}: SavableInputProps) => {
    const theme = useTheme();
    const { saving, success } = status ?? {};

    return (
        <div className='savable-input'>
            <TextField {...textFieldProps} />

            {oldValue !== textFieldProps.value && status === undefined && (
                <IconButton
                    className='save-btn'
                    onClick={onClickSaveBtn}
                    disabled={disableSaveBtn}
                >
                    <FaIcon
                        wrapper='fa' t='obj' ic={faFloppyDisk}
                        color={disableSaveBtn ? theme.palette.primary.dark : theme.palette.info.main}
                    />
                </IconButton>
            )}

            {status && (
                <>
                    {saving && (
                        <div className='status' style={{top: '20px'}}>
                            <FaIcon wrapper='i' ic='circle-notch' animation='spin' color={theme.palette.secondary.main} />
                        </div>
                    )}

                    {!saving && success && (
                        <div className='status'>
                            <FaIcon wrapper='i' ic='check-double' color={theme.palette.success.main} />
                        </div>
                    )}

                    {!saving && !success && (
                        <div className='status'>
                            <FaIcon wrapper='i' ic='circle-xmark' color={theme.palette.error.main} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SavableInput;