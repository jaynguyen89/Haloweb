import React from 'react';
import 'src/components/molecules/SavableAutocomplete/styles.scss';
import {
    Autocomplete,
    AutocompleteProps,
    Checkbox,
    IconButton,
    TextField,
    TextFieldProps,
    useTheme,
} from '@mui/material';
import FaIcon from '../../atoms/FaIcon';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

/* eslint-disable @typescript-eslint/no-explicit-any */
type SavableAutocompleteProps = {
    changed?: boolean,
    status?: {
        saving: boolean,
        success: boolean,
    },
    asCheckbox?: true,
    disableSaveBtn?: boolean,
    onClickSaveBtn?: () => void,
    textFieldProps?: TextFieldProps,
    autocompleteProps: Omit<
        AutocompleteProps<any, any, any, any>,
        'multiple' | 'filterSelectedOptions' | 'renderInput' | 'disableCloseOnSelect' | 'renderOption' | 'disableClearable'
    >,
};

const SavableAutocomplete = ({
    changed = false,
    status,
    asCheckbox,
    disableSaveBtn,
    onClickSaveBtn,
    textFieldProps,
    autocompleteProps,
}: SavableAutocompleteProps) => {
    const theme = useTheme();
    const { saving, success } = status ?? {};

    return (
        <div className='wrapper'>
            <Autocomplete
                multiple
                filterSelectedOptions
                disableCloseOnSelect
                disableClearable
                {...autocompleteProps}
                renderOption={!asCheckbox ? undefined : (props, option, { selected }) => {
                    return (
                        <li {...props}>
                            <Checkbox checked={selected} />
                            {option.title}
                        </li>
                    );
                }}
                renderInput={(params) => (
                    <TextField {...params} {...textFieldProps} />
                )}
            />

            {changed && status === undefined && (
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

export default SavableAutocomplete;
