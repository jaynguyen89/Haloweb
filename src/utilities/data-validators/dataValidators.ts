import IPublicData from 'src/models/PublicData';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';

export type TRangeOption = {
    // If true, treat the input value as number, otherwise, string by default
    asNumber?: true,
    // If specified, validate data > `min`
    min?: number,
    // If specified, validate data < `max`
    max?: number,
    // If specified, ignore min/max options, validate data === `equal`
    equal?: number | string,
    // If specified, ignore min/max options, validate data occurs in an array
    among?: Array<number | string>,
    // If specified, input is always treated as string, check if the string only contains numbers
    numbersOnly?: true,
    // If specified, input is always treated as string, check if the string only contains alphabets
    alphabetsOnly: true,
};

export type TDateOption = {
    // If specified, data must be before (lower than) this date
    beforeDate?: Date,
    // If Specified, data must be after (greater than) this date
    afterDate?: Date,
    // If specified, ignore all other options, check if data occurs in an array
    within?: Array<Date>,
};

export type TSpecialOption = {
    // If true, the field will be considered a Password, and validated against PasswordConfirm, see mapFieldsToValidators
    isPassword?: true,
    // If true, at least 1 lowercase char must be included in data
    includeLowercaseChar?: true,
    // If true, at least 1 uppercase Char must be included in data
    includeUppercaseChar?: true,
    includeNumber?: true,
    // If true but specialCharsToInclude === undefined, at least 1 of any special chars must be included in data
    includeSpecialChar?: true,
    // If provided, when includeSpecialChar === undefined, data MAY only contain these special chars
    // when includeSpecialChars === true, data MUST only contain at least 1 of these special chars
    specialCharsToInclude?: string,
    // Whether to allow spaces inside the input string
    allowSpace?: true,
};

export type TFileOption = {
    maxSize?: number,
    acceptedFormats?: Array<string>,
};

export type TFileListOption = TFileOption & {
    minCount?: number,
    maxCount?: number,
};

// Decorator pattern: InputData is decorated with the specific validators below
export class InputData<T> {
    data: T | undefined;

    constructor(data: T | undefined) {
        this.data = data;
    }
}

export class RangeValidator<T extends string> {
    options: TRangeOption;
    input: InputData<T>;

    constructor(input: InputData<T>, options: TRangeOption) {
        this.input = input;
        this.options = options;
    }

    public validate(): TFieldResult {
        let messages: Map<string, object | undefined> | undefined = new Map<string, object | undefined>();

        let data: string | number = this.input.data as string;
        if (this.options.alphabetsOnly || this.options.numbersOnly)
            this.options.asNumber = undefined;

        if (this.options.asNumber) {
            data = +data;
            if (isNaN(data)) {
                messages.set('messages.input-is-nan', undefined);
                return { isValid: false, messages } as TFieldResult;
            }
        }

        if (this.options.equal || this.options.among) {
            this.options.min = undefined;
            this.options.max = undefined;
        }

        let minValidity = true;
        if (this.options.min) {
            if (this.options.asNumber) minValidity = data >= this.options.min;
            else minValidity = (data as string).length >= this.options.min;

            if (!minValidity) messages.set(`messages.input-min-${this.options.asNumber ? 'as-number' : 'as-string'}`, { min: this.options.min });
        }

        let maxValidity = true;
        if (this.options.max) {
            if (this.options.asNumber) maxValidity = data <= this.options.max;
            else maxValidity = (data as string).length <= this.options.max;

            if (!maxValidity) messages.set(`messages.input-max-${this.options.asNumber ? 'as-number' : 'as-string'}`, { max: this.options.max });
        }

        let equalValidity = true;
        if (this.options.equal) {
            if (this.options.asNumber) equalValidity = data === this.options.equal;
            else equalValidity = (data as string).length === this.options.equal;

            if (!equalValidity) messages.set(`messages.input-equal-${this.options.asNumber ? 'as-number' : 'as-string'}`, { equal: this.options.equal });
        }

        let amongValidity = true;
        if (this.options.among) {
            amongValidity = this.options.among.includes(data);
            if (!amongValidity) messages.set('messages.input-among', { values: this.options.among.join(', ') });
        }

        let numbersOnlyValidity = true;
        if (this.options.numbersOnly) numbersOnlyValidity = /^\d+$/.test(data as string);
        if (!numbersOnlyValidity) messages.set('messages.input-numbers-only', undefined);

        let alphabetsOnlyValidity = true;
        if (this.options.alphabetsOnly) alphabetsOnlyValidity = /^\w+$/.test(data as string);
        if (!alphabetsOnlyValidity) messages.set('messages.input-alphabets-only', undefined);

        const isValid = minValidity && maxValidity && equalValidity && amongValidity && numbersOnlyValidity && alphabetsOnlyValidity;

        if (isValid) messages = undefined;
        return { isValid, messages } as TFieldResult;
    }
}

export class DateValidator<T extends Date> {
    options: TDateOption;
    input: InputData<T>;

    constructor(input: InputData<T>, options:  TDateOption) {
        this.input = input;
        this.options = options;
    }

    public validate(): TFieldResult {
        let messages: Map<string, object | undefined> | undefined = new Map<string, object | undefined>();
        const data = this.input.data as Date;

        if (this.options.within) {
            this.options.beforeDate = undefined;
            this.options.afterDate = undefined;
        }

        let afterDateValidity = true;
        if (this.options.afterDate) {
            afterDateValidity = data > this.options.afterDate;
            if (!afterDateValidity) messages.set('messages.input-after-date', { date: this.options.afterDate });
        }

        let beforeDateValidity = true;
        if (this.options.beforeDate) {
            beforeDateValidity = data < this.options.beforeDate;
            if (!beforeDateValidity) messages.set('messages.input-before-date', { date: this.options.beforeDate });
        }

        let amongValidity = true;
        if (this.options.within) {
            amongValidity = this.options.within.includes(data);
            if (!amongValidity) messages.set('messages.input-within-date', {
                date1: this.options.within[0],
                date2: this.options.within[1],
            });
        }

        const isValid = afterDateValidity && beforeDateValidity && amongValidity;

        if (isValid) messages = undefined;
        return { isValid, messages } as TFieldResult;
    }
}

export class SpecialValidator<T extends string> extends RangeValidator<T> {
    specialOptions: TSpecialOption;

    constructor(input: InputData<T>, options: TRangeOption & TSpecialOption) {
        super(input, options);
        this.specialOptions = options;
    }

    public validate(): TFieldResult {
        let {
            isValid = true,
            messages = new Map<string, object | undefined>(),
        } = super.validate();
        const data = this.input.data as string;

        let includeLowercaseCharValidity = true;
        if (this.specialOptions.includeLowercaseChar) {
            includeLowercaseCharValidity = /[a-z]+/.test(data);
            if (!includeLowercaseCharValidity) (messages as Map<string, object | undefined>).set('messages.input-include-lowercase-char', undefined);
        }

        let includeUppercaseCharValidity = true;
        if (this.specialOptions.includeUppercaseChar) {
            includeUppercaseCharValidity = /[A-Z]+/.test(data);
            if (!includeUppercaseCharValidity) (messages as Map<string, object | undefined>).set('messages.input-include-uppercase-char', undefined);
        }

        let includeNumberValidity = true;
        if (this.specialOptions.includeNumber) {
            includeNumberValidity = /[0-9]+/.test(data);
            if (!includeNumberValidity) (messages as Map<string, object | undefined>).set('messages.input-include-number', undefined);
        }

        let specialCharsToIncludeValidity = true;
        if (this.specialOptions.specialCharsToInclude) {
            if (this.specialOptions.includeSpecialChar === undefined) {
                const pattern = `^[a-zA-Z0-9 ${this.specialOptions.specialCharsToInclude}]+$`;
                const regex = new RegExp(pattern, 'i');
                specialCharsToIncludeValidity = regex.test(data);
            }
            else
                specialCharsToIncludeValidity = this.specialOptions.specialCharsToInclude.split('').some(char => data.includes(char));

            if (!specialCharsToIncludeValidity)
                (messages as Map<string, object | undefined>).set(
                    `messages.input-with-special-chars-${this.specialOptions.includeSpecialChar ? 'must' : 'may'}-include`,
                    { chars: this.specialOptions.specialCharsToInclude },
                );
        }

        let includeSpecialCharValidity = true;
        if (this.specialOptions.includeSpecialChar && this.specialOptions.specialCharsToInclude === undefined) {
            includeSpecialCharValidity = /(?=.*\W)/.test(data);
            if (!includeSpecialCharValidity) (messages as Map<string, object | undefined>).set('messages.input-include-special-chars', undefined);
        }

        let allowSpaceValidity = true;
        if (!this.specialOptions.allowSpace) {
            const hasSpace = data.includes(' ');
            if (hasSpace) {
                (messages as Map<string, object | undefined>).set('messages.input-allow-space', undefined);
                allowSpaceValidity = !hasSpace;
            }
        }

        let passwordMatching = true;
        if (this.specialOptions.isPassword) {
            (messages as Map<string, object | undefined>).delete('messages.input-among');
            passwordMatching = this.options.among?.includes(data) ?? false;
            if (!passwordMatching) (messages as Map<string, object | undefined>).set('messages.input-is-password', undefined);
        }

        isValid = isValid && includeLowercaseCharValidity && includeUppercaseCharValidity &&
            includeNumberValidity && specialCharsToIncludeValidity && includeSpecialCharValidity && allowSpaceValidity;

        return {
            isValid,
            messages: isValid ? undefined : messages,
        };
    }
}

export class EmailValidator<T extends string> extends RangeValidator<T> {
    constructor(input: InputData<T>, options: TRangeOption) {
        super(input, options);
    }

    public validate(): TFieldResult {
        let {
            isValid = true,
            messages = new Map<string, object | undefined>(),
        } = super.validate();
        const data = this.input.data as string;

        // RFC2822 standard regex for email validation
        const isEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(data);
        if (!isEmail) (messages as Map<string, object | undefined>).set('messages.input-email-format', undefined);

        isValid = isValid && isEmail;

        return {
            isValid,
            messages: isValid ? undefined : messages,
        };
    }
}

export class UrlValidator<T extends string> extends RangeValidator<T> {
    constructor(input: InputData<T>, options: TRangeOption) {
        super(input, options);
    }

    public validate(): TFieldResult {
        let {
            isValid = true,
            messages = new Map<string, object | undefined>(),
        } = super.validate();
        const data = this.input.data as string;

        const isUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&/=]*)/.test(data);
        if (!isValid) (messages as Map<string, object | undefined>).set('messages.input-url-format', undefined);

        isValid = isValid && isUrl;

        return {
            isValid,
            messages: isValid ? undefined : messages,
        };
    }
}

export class FileValidator<T extends File> {
    options: TFileOption;
    input: InputData<T>;

    constructor(input: InputData<T>, options: TFileOption) {
        this.input = input;
        this.options = options;
    }

    public validate(): TFieldResult {
        let messages: Map<string, object | undefined> | undefined = new Map<string, object | undefined>();
        const data = this.input.data as File;

        let maxSizeValidity = true;
        if (this.options.maxSize) {
            maxSizeValidity = data.size <= this.options.maxSize;
            if (!maxSizeValidity) messages.set('messages.input-file-max-size', { size: this.options.maxSize / 1000 });
        }

        let acceptedFormatsValidity = true;
        if (this.options.acceptedFormats) {
            acceptedFormatsValidity = this.options.acceptedFormats.some(format => data.type.includes(format));
            if (!acceptedFormatsValidity) messages.set('messages.input-file-accepted-formats', { formats: this.options.acceptedFormats.join(', ') });
        }

        const isValid = maxSizeValidity && acceptedFormatsValidity;
        if (isValid) messages = undefined;
        return { isValid, messages };
    }
}

export class FileListValidator<T extends FileList> {
    options: TFileListOption;
    input: InputData<T>;

    constructor(input: InputData<T>, options: TFileListOption) {
        this.input = input;
        this.options = options;
    }

    public validate(): TFieldResult {
        let isValid = true;
        let messages: Map<string, object | undefined> | undefined = new Map<string, object>();
        const data = this.input.data as FileList;

        let minCountValidity = true;
        if (this.options.minCount) {
            minCountValidity = data.length >= this.options.minCount;
            if (!minCountValidity) messages.set('messages.input-files-min-count', { count: this.options.minCount });
        }

        let maxCountValidity = true;
        if (this.options.maxCount) {
            maxCountValidity = data.length <= this.options.maxCount;
            if (!maxCountValidity) messages.set('messages.input-files-max-count', { count: this.options.maxCount });
        }

        isValid = minCountValidity && maxCountValidity;

        for (let i = 0; i < data.length; i++) {
            const file = data.item(i) as File;

            let maxSizeValidity = true;
            if (this.options.maxSize) {
                maxSizeValidity = file.size <= this.options.maxSize;
                if (!maxSizeValidity) messages.set('messages.input-files-max-size', {
                    name: file.name,
                    size: this.options.maxSize / 1000,
                });
            }

            let acceptedFormatsValidity = true;
            if (this.options.acceptedFormats) {
                acceptedFormatsValidity = this.options.acceptedFormats.some(format => file.type.includes(format));
                if (!acceptedFormatsValidity) messages.set('messages.input-files-accepted-formats', {
                    name: file.name,
                    formats: this.options.acceptedFormats.join(', '),
                });
            }

            isValid = isValid && maxSizeValidity && acceptedFormatsValidity;
        }

        if (isValid) messages = undefined;
        return { isValid, messages };
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

export type TValidatorOptionsMapFn<T> = (publicData?: IPublicData) => TValidatorOption<T>;

export type TFormDataState<T> = {
    [key in keyof T]: {
        value: string | Date | File | FileList | undefined;
        caption?: string | undefined;
    };
};

export const mapFieldsToValidators = <T>(
    formData: TFormDataState<T>,
    publicData: IPublicData,
    validatorOptionsMapFn: TValidatorOptionsMapFn<T>,
    field: keyof T,
    validatorName: string,
) => {
    let validator;
    switch (validatorName) {
        case ValidatorNames.LengthValidator:
            validator = new RangeValidator(
                new InputData<string>(formData[field].value as string | undefined),
                validatorOptionsMapFn(publicData)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.RangeValidator:
            validator = new DateValidator(
                new InputData<Date>(formData[field].value as Date | undefined),
                validatorOptionsMapFn(publicData)[field] as TDateOption,
            );
            break;
        case ValidatorNames.SpecialValidator:
            const validatorOptions = validatorOptionsMapFn(publicData)[field] as TRangeOption & TSpecialOption;
            if (validatorOptions.isPassword) {
                const passwordConfirmValue = formData['PasswordConfirm' as keyof T].value;
                validatorOptions.among = passwordConfirmValue ? [passwordConfirmValue] as Array<string> : undefined;
            }

            validator = new SpecialValidator(new InputData<string>(formData[field].value as string | undefined), validatorOptions);
            break;
        case ValidatorNames.EmailValidator:
            validator = new EmailValidator(
                new InputData<string>(formData[field].value as string | undefined),
                validatorOptionsMapFn(publicData)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.UrlValidator:
            validator = new UrlValidator(
                new InputData<string>(formData[field].value as string | undefined),
                validatorOptionsMapFn(publicData)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.FileValidator:
            validator = new FileValidator(
                new InputData<File>(formData[field].value as File | undefined),
                validatorOptionsMapFn(publicData)[field] as TFileOption,
            );
            break;
        case ValidatorNames.FileListValidator:
            validator = new FileListValidator(
                new InputData<FileList>(formData[field].value as FileList | undefined),
                validatorOptionsMapFn(publicData)[field] as TFileListOption,
            );
            break;
        default:
            validator = undefined;
            break;
    }

    return validator;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type TAnyValidator = |
    undefined |
    RangeValidator<any> |
    DateValidator<any> |
    SpecialValidator<any> |
    EmailValidator<any> |
    UrlValidator<any> |
    FileValidator<any> |
    FileListValidator<any>;

export type TFieldValidatorMap<T> = {
    [key in keyof T]: TAnyValidator;
};
