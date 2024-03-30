import { DateFormats, TimeFormats } from 'src/commons/enums';
import { TDateFormat } from 'src/commons/types';
import { DateTime } from 'luxon';

export const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

export const format = (date: Date, options: TDateFormat): string => {
    const dateFormats = Object.values(DateFormats);
    const timeFormats = Object.values(TimeFormats);

    // Require the date only, ignore time
    if (options.dateOnly && !options.timeOnly) {
        if (!options.formats.date) throw new Error('options.formats.date is required for formatting the date.');
        return DateTime.fromJSDate(date).toFormat(dateFormats[options.formats.date]);
    }

    // Require the time only, ignore date
    if (!options.dateOnly && options.timeOnly) {
        if (!options.formats.time) throw new Error('options.formats.time is required for formatting the time.');
        return DateTime.fromJSDate(date).toFormat(timeFormats[options.formats.time]);
    }

    // Require both date and time
    if (!options.formats.date || !options.formats.time) throw new Error('options.formats is required for formatting date and time.');
    return DateTime.fromJSDate(date).toFormat(`${dateFormats[options.formats.date]} ${timeFormats[options.formats.time]}`)
};
