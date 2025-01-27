import React from 'react';
import Calendar from 'src/components/atoms/Calendar';
import { DateTime } from 'luxon';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import 'src/components/molecules/SavableCalendar/styles.scss';
import { IconButton, useTheme } from '@mui/material';
import FaIcon from '../../atoms/FaIcon';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

type TDatePickerProps = DatePickerProps & {
    label: string,
    oldValue?: string | null,
    onClickSaveBtn?: () => void,
    status?: {
        saving: boolean,
        success: boolean,
    },
};

const SavableCalendar = ({
    label,
    oldValue,
    onClickSaveBtn,
    status,
    disableFuture,
    disablePast,
    minDate = DateTime.now().minus({ year: 100 }),
    maxDate = DateTime.now().plus({ year: 1 }),
    format = 'dd/MM/yyyy',
    ...props
}: TDatePickerProps) => {
    const theme = useTheme();
    const { saving, success } = status ?? {};

    const [changed, setChanged] = React.useState(false);

    return (
        <div className='wrapper'>
            <Calendar
                disableFuture={disableFuture}
                disablePast={disablePast}
                minDate={disablePast ? undefined : minDate}
                maxDate={disableFuture ? undefined : maxDate}
                label={`${label} (${format?.toLowerCase()})`}
                views={['year', 'month', 'day']}
                format={format}
                onChange={(value) => {
                    const prev = oldValue ? DateTime.fromISO(oldValue).toFormat(format) : null;
                    const current = value?.toFormat(format) ?? null;
                    setChanged(prev !== current);
                }}
                {...props}
            />

            {changed && status === undefined && (
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

export default SavableCalendar;