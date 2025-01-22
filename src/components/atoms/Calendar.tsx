import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

const Calendar = (props: DatePickerProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DatePicker {...props} />
        </LocalizationProvider>
    );
};

export default Calendar;