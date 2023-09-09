import { TFunction } from 'i18next';

export type TRangeOption = {
    // The key of an input field, is used to map the status messages to the input field
    captionKey: string,
    // If specified, validate data > `min`
    min?: number,
    // If specified, validate data < `max`
    max?: number,
    // If specified, ignore all other options, validate data === `equal`
    equal?: number | string,
    // If specified, ignore all other options, validate data occurs in an array
    among?: Array<number | string>,
};

export type TDateOption = {
    // The key of an input field, is used to map the status messages to the input field
    captionKey: string,
    // If specified, data must be before (lower than) this date
    beforeDate?: Date,
    // Iff Specified, data must be after (greater than) this date
    afterDate?: Date,
};

export type TSpecialOption = {
    // The key of an input field, is used to map the status messages to the input field
    captionKey: string,
    // If true, at least 1 lowercase char must be included in data
    includeLowercaseChar?: true,
    // If true, at least 1 uppercase Char must be included in data
    includeUppercaseChar?: true,
    includeNumber?: true,
    // If true but specialCharsToInclude === undefined, at least 1 of any special chars must be included in data
    includeSpecialChar?: true,
    // If provided, auto consider includeSpecialChar === true, at least 1 of these special chars must be included in data
    specialCharsToInclude?: string,
    // Whether to allow spaces inside the input string
    allowSpace?: true,
};

export type TFileOption = {
    // The key of an input field, is used to map the status messages to the input field
    captionKey: string,
    maxSize?: number,
    acceptedFormats: Array<string>,
};

export type TFileListOption = TFileOption & {
    // The key of an input field, is used to map the status messages to the input field
    captionKey: string,
    minCount?: number,
    maxCount?: number,
};

type ValidationResult = {
    captionKey: string,
    isValid: boolean,
    message?: string,
};

// Decorator pattern: InputData is decorated with the specific validators below
export class InputData<T> {
    data: T | undefined;
    t: TFunction;

    constructor(data: T | undefined, t: TFunction) {
        this.data = data;
    }
}

export class LengthValidator<T extends string> {
    options: TRangeOption;
    data: InputData<T>;

    constructor(data: InputData<T>, options: TRangeOption) {
        this.data = data;
        this.options = options;
    }

    public validate(): boolean {
        return true;
    }
}

export class RangeValidator<T extends number | Date> {
    options: TRangeOption | TDateOption;
    data: InputData<T>;

    constructor(data: InputData<T>, options: TRangeOption | TDateOption) {
        this.data = data;
        this.options = options;
    }

    public validate(): boolean {
        return true;
    }
}

export class SpecialValidator<T extends string> extends LengthValidator<T> {
    specialOptions: TSpecialOption;

    constructor(data: InputData<T>, options: TRangeOption, specialOptions: TSpecialOption) {
        super(data, options);
        this.specialOptions = specialOptions;
    }

    public validate(): boolean {
        return true && super.validate();
    }
}

export class EmailValidator<T extends string> extends LengthValidator<T> {
    constructor(data: InputData<T>, options: TRangeOption) {
        super(data, options);
    }

    public validate(): boolean {
        return true && super.validate();
    }
}

export class UrlValidator<T extends string> extends LengthValidator<T> {
    constructor(data: InputData<T>, options: TRangeOption) {
        super(data, options);
    }

    public validate(): boolean {
        return true && super.validate();
    }
}

export class FileValidator<T extends File> {
    options: TFileOption;
    data: InputData<T>;

    constructor(data: InputData<T>, options: TFileOption) {
        this.data = data;
        this.options = options;
    }

    public validate(): boolean {
        return true;
    }
}

export class FileListValidator<T extends FileList> {
    options: TFileListOption;
    data: InputData<T>;

    constructor(data: InputData<T>, options: TFileListOption) {
        this.data = data;
        this.options = options;
    }

    public validate(): boolean {
        return true;
    }
}
