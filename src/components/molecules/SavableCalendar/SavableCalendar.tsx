import React from 'react';
import Calendar from 'src/components/atoms/Calendar';
import { DateTime } from 'luxon';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import 'src/components/molecules/SavableCalendar/styles.scss';
import { IconButton, useTheme } from '@mui/material';
import FaIcon from '../../atoms/FaIcon';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { DateFormats } from 'src/commons/enums';
import configs from 'src/commons/configs';
import { SavableStatus } from 'src/commons/types';

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
type TDatePickerProps = DatePickerProps<any> & {
    label: string,
    oldValue?: string | null,
    onDatePicked: (date: DateTime) => void,
    disableSaveBtn?: boolean,
    onClickSaveBtn?: () => void,
    status?: SavableStatus,
};

const SavableCalendar = ({
    label,
    oldValue,
    disableSaveBtn,
    onClickSaveBtn,
    status,
    disableFuture,
    disablePast,
    minDate = DateTime.now().minus({ year: configs.maxAge }),
    maxDate = DateTime.now().minus({ year: configs.minAge }),
    format = DateFormats.DDMMYYYYS,
    onDatePicked,
    ...props
}: TDatePickerProps) => {
    const theme = useTheme();
    const { saving, success } = status ?? {};

    const [changed, setChanged] = React.useState(false);

    return (
        <div className='savable-calendar'>
            <Calendar
                disableFuture={disableFuture}
                disablePast={disablePast}
                minDate={disablePast ? undefined : minDate}
                maxDate={disableFuture ? undefined : maxDate}
                label={`${label} (${format?.toLowerCase()})`}
                views={['year', 'month', 'day']}
                format={format}
                onChange={(value: DateTime) => {
                    const prev = oldValue ? DateTime.fromISO(oldValue).toFormat(format) : null;
                    const current = value.toFormat(format) ?? null;
                    setChanged(prev !== current);
                    onDatePicked(value.toFormat(format));
                }}
                {...props}
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

export default SavableCalendar;