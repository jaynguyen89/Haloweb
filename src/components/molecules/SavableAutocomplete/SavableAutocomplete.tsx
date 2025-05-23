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
import { GroupLikeOf, SavableStatus } from 'src/commons/types';

type SavableAutocompleteProps<T> = {
    changed?: boolean,
    status?: SavableStatus,
    asCheckbox?: true,
    disableSaveBtn?: boolean,
    onClickSaveBtn?: () => void,
    textFieldProps?: TextFieldProps,
    autocompleteProps: Omit<
        AutocompleteProps<GroupLikeOf<T>, true, true, true>,
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
        <div className='autocomplete'>
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
                            {option.name}
                        </li>
                    );
                }}
                renderInput={(params) => (
                    <TextField {...params} {...textFieldProps} />
                )}
            />

            {changed && (
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
                        <div className='status'>
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

export default SavableAutocomplete;
