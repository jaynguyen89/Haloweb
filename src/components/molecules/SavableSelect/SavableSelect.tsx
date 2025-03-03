import React, { PropsWithChildren } from 'react';
import 'src/components/molecules/SavableSelect/styles.scss';
import { FormControl, IconButton, InputLabel, Select, SelectProps, useTheme } from '@mui/material';
import FaIcon from '../../atoms/FaIcon';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { SavableStatus } from 'src/commons/types';

type SavableSelectProps = SelectProps & PropsWithChildren & {
    id?: string,
    oldValue?: string | number | null,
    disableSaveBtn?: boolean,
    onClickSaveBtn?: () => void,
    status?: SavableStatus,
};

const SavableSelect = ({
    id,
    oldValue,
    disableSaveBtn,
    onClickSaveBtn,
    status,
    children,
    ...selectProps
}: SavableSelectProps) => {
    const theme = useTheme();
    const { saving, success } = status ?? {};

    return (
        <div className='savable-select'>
            <FormControl fullWidth>
                <InputLabel id={id}>{selectProps.label}</InputLabel>
                <Select labelId={id} {...selectProps}>{children}</Select>
            </FormControl>

            {oldValue !== selectProps.value && (
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

                    {success && !saving && (
                        <div className='status'>
                            <FaIcon wrapper='i' ic='check-double' color={theme.palette.success.main} />
                        </div>
                    )}

                    {!success && !saving && (
                        <div className='status'>
                            <FaIcon wrapper='i' ic='circle-xmark' color={theme.palette.error.main} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SavableSelect;