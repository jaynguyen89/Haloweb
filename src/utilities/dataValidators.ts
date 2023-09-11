import { TFunction } from 'i18next';
import IPublicData from 'src/models/PublicData';

export type TRangeOption = {
    // The key of an input field, is used to map the status messages to the input field
    captionKey: string,
    // If true, treat the input value as number, otherwise, string by default
    asNumber?: true,
    // If specified, validate data > `min`
    min?: number,
    // If specified, validate data < `max`
    max?: number,
    // If specified, ignore all other options, validate data === `equal`
    equal?: number | string,
    // If specified, ignore all other options, validate data occurs in an array
    among?: Array<number | string>,
    length?: number,
    numbersOnly?: true,
    alphabetsOnly: true,
};

export type TDateOption = {
    // The key of an input field, is used to map the status messages to the input field
    captionKey: string,
    // If specified, data must be before (lower than) this date
    beforeDate?: Date,
    // Iff Specified, data must be after (greater than) this date
    afterDate?: Date,
    among?: Array<Date>,
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

export class RangeValidator<T extends string> {
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

export class DateValidator<T extends Date> {
    options: TDateOption;
    data: InputData<T>;

    constructor(data: InputData<T>, options:  TDateOption) {
        this.data = data;
        this.options = options;
    }

    public validate(): boolean {
        return true;
    }
}

export class SpecialValidator<T extends string> extends RangeValidator<T> {
    specialOptions: TSpecialOption;

    constructor(data: InputData<T>, options: TRangeOption & TSpecialOption) {
        super(data, options);
        this.specialOptions = options;
    }

    public validate(): boolean {
        return true && super.validate();
    }
}

export class EmailValidator<T extends string> extends RangeValidator<T> {
    constructor(data: InputData<T>, options: TRangeOption) {
        super(data, options);
    }

    public validate(): boolean {
        return true && super.validate();
    }
}

export class UrlValidator<T extends string> extends RangeValidator<T> {
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

export enum ValidatorNames {
    LengthValidator = 'LengthValidator',
    RangeValidator = 'RangeValidator',
    SpecialValidator = 'SpecialValidator',
    EmailValidator = 'EmailValidator',
    UrlValidator = 'UrlValidator',
    FileValidator = 'FileValidator',
    FileListValidator = 'FileListValidator',
}

export type TValidatorOption<T> = {
    [key in keyof T]: |
        TRangeOption |
        TRangeOption & TSpecialOption |
        TSpecialOption |
        (TRangeOption | TDateOption) |
        TFileOption |
        TFileListOption;
}

export type TValidatorOptionsMapFn<T> = (publicData: IPublicData) => TValidatorOption<T>;

export type TFormDataState<T> = {
    [key in keyof T]: {
        value: string | Date | File | FileList | undefined;
        caption?: string | undefined;
    };
};

export const mapFieldsToValidators = <T>(
    field: keyof T,
    formData: TFormDataState<T>,
    validatorName: string,
    validatorOptionsMapFn: TValidatorOptionsMapFn<T>,
    publicData: IPublicData,
    t: TFunction,
) => {
    let validator;
    switch (validatorName) {
        case ValidatorNames.LengthValidator:
            validator = new RangeValidator(
                new InputData<string>(formData[field].value as string | undefined, t),
                validatorOptionsMapFn(publicData)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.RangeValidator:
            validator = new DateValidator(
                new InputData<Date>(formData[field].value as Date | undefined, t),
                validatorOptionsMapFn(publicData)[field] as TDateOption,
            );
            break;
        case ValidatorNames.SpecialValidator:
            validator = new SpecialValidator(
                new InputData<string>(formData[field].value as string | undefined, t),
                validatorOptionsMapFn(publicData)[field] as TRangeOption & TSpecialOption,
            );
            break;
        case ValidatorNames.EmailValidator:
            validator = new EmailValidator(
                new InputData<string>(formData[field].value as string | undefined, t),
                validatorOptionsMapFn(publicData)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.UrlValidator:
            validator = new UrlValidator(
                new InputData<string>(formData[field].value as string | undefined, t),
                validatorOptionsMapFn(publicData)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.FileValidator:
            validator = new FileValidator(
                new InputData<File>(formData[field].value as File | undefined, t),
                validatorOptionsMapFn(publicData)[field] as TFileOption,
            );
            break;
        default: // ValidatorNames.FileListValidator
            validator = new FileListValidator(
                new InputData<FileList>(formData[field].value as FileList | undefined, t),
                validatorOptionsMapFn(publicData)[field] as TFileListOption,
            );
            break;
    }

    return validator;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type TFieldValidatorMap<T> = {
    [key in keyof T]: |
        RangeValidator<any> |
        DateValidator<any> |
        SpecialValidator<any> |
        EmailValidator<any> |
        UrlValidator<any> |
        FileValidator<any> |
        FileListValidator<any>;
};
