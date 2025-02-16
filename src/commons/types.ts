export type TTranslationMap = {
    [key: string]: string | TTranslationMap,
};

export type TFormIcon = 'img' | 'url' | 'text' | 'fa';

/*
Either dateOnly or timeOnly can be true at once.
- dateOnly: requires the formatted date, ignore the time
- timeOnly: requires the formatted time, ignore the date
- Both undefined or true: requires the formatted full date and time
- formats.date and formats.time should be given the one of the `index` values in dateFormats and timeFormats of PublicData
 */
export type TDateFormat = {
    dateOnly?: true,
    timeOnly?: true,
    formats: {
        date?: string,
        time?: string,
    },
};
