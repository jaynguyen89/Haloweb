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

/* This type is generic for any data to be used for Autocomplete input with Category.
* The key `parent` can take value of parent name or ID, depending on whichever exists in the type <T>. */
export type GroupLikeOf<T> = {
    parent: string,
} & Omit<T, 'parent' | 'parentId'>;

/* This type represents a single group of generic items <T>, use it as Array<GroupOf<T>>.*/
export type GroupOf<T> = Partial<{
    id: string,
    name: string,
}> & {
    items: Omit<T, 'parent' | 'parentId'>,
};