import React, { PropsWithChildren } from 'react';
import 'src/components/molecules/SavableSelect/styles.scss';
import { FormControl, IconButton, InputLabel, Select, SelectProps, useTheme } from '@mui/material';
import FaIcon from '../../atoms/FaIcon';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

type SavableSelectProps = SelectProps & PropsWithChildren & {
    id?: string,
    oldValue?: string | number | null,
    onClickSaveBtn?: () => void,
    status?: {
        saving: boolean,
        success: boolean,
    },
};

const SavableSelect = ({
    id,
    oldValue,
    onClickSaveBtn,
    status,
    children,
    ...selectProps
}: SavableSelectProps) => {
    const theme = useTheme();
    const { saving, success } = status ?? {};

    return (
        <div className='wrapper'>
            <FormControl fullWidth>
                <InputLabel id={id}>{selectProps.label}</InputLabel>
                <Select labelId={id} {...selectProps}>{children}</Select>
            </FormControl>

            {oldValue !== selectProps.value && status === undefined && (
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

export default SavableSelect;