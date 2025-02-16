import IPublicData from 'src/models/PublicData';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';
import { TDateFormat } from 'src/commons/types';
import { format } from 'src/utilities/timeUtilities';
import { DateTime } from 'luxon';
import { DateFormats } from 'src/commons/enums';

export type TRangeOption = {
    // If true, treat the input value as number, otherwise, string by default
    asNumber?: true,
    // If specified, validate data >= `min`
    min?: number,
    // If specified, validate data <= `max`
    max?: number,
    // If specified, ignore min/max options, validate data === `equal`
    equal?: number | string,
    // If specified, ignore min/max options, validate data occurs in an array
    among?: Array<number | string>,
    // If specified, input is always treated as string, check if it only contains numbers
    numbersOnly?: true,
    // If specified, input is always treated as string, check if it only contains alphabets
    alphabetsOnly?: true,
    // If specified, input is always treated as string, check if it only contains numbers and alphabets
    alphanumeric?: true,
    // If specified, input will be validated by Regex against this pattern.
    pattern?: string,
};

export type TDateOption = {
    // If specified, data must be before (lower than) this date
    beforeDate?: DateTime,
    // If Specified, data must be after (greater than) this date
    afterDate?: DateTime,
    // If specified, ignore all other options, check if data occurs in an array
    among?: Array<DateTime>,
};

export type TSpecialOption = TRangeOption & {
    // If true, the field will be considered a Password, and validated against PasswordConfirm, see mapFieldsToValidators
    isPassword?: true,
    // If true, white space must include; if false, white space must not include; if undefined, white space does not matter
    withSpace?: boolean,
    // If true, at least 1 lowercase char must be included; if false, no lowercase char is allowed; if undefined, lowercase char does not matter
    withLowercaseChar?: boolean,
    // If true, at least 1 uppercase char must be included; if false, no number is allowed; if undefined, uppercase char does not matter
    withUppercaseChar?: boolean,
    // If true, at least 1 number must be included; if false, no number is allowed; if undefined, number does not matter
    withNumber?: boolean,
    // If true, at least 1 special chars must be included in data; if false, no special char is allowed; if undefined, special char does not matter
    withSpecialChar?: boolean,
    // If provided, when includeSpecialChar === undefined | true, data MAY or MUST only contain these special chars
    specialCharsToInclude?: string,
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
            amongValidity = this.options.among.includes(`${data}`);
            if (!amongValidity) messages.set('messages.input-among', { values: this.options.among.join(', ') });
        }

        let numbersOnlyValidity = true;
        if (this.options.numbersOnly) numbersOnlyValidity = /^\d+$/.test(data as string);
        if (!numbersOnlyValidity) messages.set('messages.input-numbers-only', undefined);

        let alphabetsOnlyValidity = true;
        if (this.options.alphabetsOnly) alphabetsOnlyValidity = /^[a-zA-Z\u00C0-\u00FF_]+$/.test(data as string);
        if (!alphabetsOnlyValidity) messages.set('messages.input-alphabets-only', undefined);

        let alphanumericValidity = true;
        if (this.options.alphanumeric) alphanumericValidity = /^[\w\u00C0-\u00FF]+$/.test(data as string);
        if (!alphanumericValidity) messages.set('messages.input-alphanumeric', undefined);

        let patternValidity = true;
        if (this.options.pattern) patternValidity = new RegExp(`/^${this.options.pattern}$/`, 'gi').test(data as string);
        if (!patternValidity) messages.set('messages.input-pattern', { chars: this.options.pattern });

        const isValid =
            minValidity &&
            maxValidity &&
            equalValidity &&
            amongValidity &&
            numbersOnlyValidity &&
            alphabetsOnlyValidity &&
            alphanumericValidity &&
            patternValidity;

        if (isValid) messages = undefined;
        return { isValid, messages } as TFieldResult;
    }
}

export class DateValidator<T extends Date> {
    options: TDateOption;
    input: InputData<T>;
    formats: TDateFormat;

    constructor(input: InputData<T>, options:  TDateOption, formats: TDateFormat) {
        this.input = input;
        this.options = options;
        this.formats = formats;
    }

    public validate(): TFieldResult {
        let messages: Map<string, object | undefined> | undefined = new Map<string, object | undefined>();
        const data = this.input.data as Date;

        if (this.options.among) {
            this.options.beforeDate = undefined;
            this.options.afterDate = undefined;
        }

        let afterDateValidity = true;
        if (this.options.afterDate) {
            afterDateValidity = DateTime.fromFormat(data, DateFormats.DDMMYYYYS) > this.options.afterDate;
            if (!afterDateValidity) messages.set('messages.input-after-date', { date: format(this.options.afterDate, this.formats) });
        }

        let beforeDateValidity = true;
        if (this.options.beforeDate) {
            beforeDateValidity = DateTime.fromFormat(data, DateFormats.DDMMYYYYS) < this.options.beforeDate;
            if (!beforeDateValidity) messages.set('messages.input-before-date', { date: format(this.options.beforeDate, this.formats) });
        }

        if (!beforeDateValidity && !afterDateValidity)
            messages = new Map<string, object>([['messages.input-between-dates', {
                beforeDate: format(this.options.beforeDate!, this.formats),
                afterDate: format(this.options.afterDate!, this.formats),
            }]]);

        let amongValidity = true;
        if (this.options.among) {
            amongValidity = !!(this.options.among.find(date => date.getTime() === data.getTime()));
            if (!amongValidity) messages.set('messages.input-among-dates', {
                dates: this.options.among.map(date => format(date, this.formats)).join(', '),
            });
        }

        const isValid = afterDateValidity && beforeDateValidity && amongValidity;

        if (isValid) messages = undefined;
        return { isValid, messages } as TFieldResult;
    }
}

export class SpecialValidator<T extends string> extends RangeValidator<T> {
    specialOptions: TSpecialOption;

    constructor(input: InputData<T>, options: TSpecialOption) {
        super(input, options);
        this.specialOptions = options;
    }

    public validate(): TFieldResult {
        let {
            isValid = true,
            messages = new Map<string, object | undefined>(),
        } = super.validate();
        const data = this.input.data as string;

        let allowSpaceValidity = true;
        if (this.specialOptions.withSpace !== undefined) {
            const hasSpace = data.includes(' ');

            if (this.specialOptions.withSpace && !hasSpace) {
                (messages as Map<string, object | undefined>).set('messages.input-space-required', undefined);
                allowSpaceValidity = hasSpace;
            }

            if (!this.specialOptions.withSpace && hasSpace) {
                (messages as Map<string, object | undefined>).set('messages.input-space-disallowed', undefined);
                allowSpaceValidity = !hasSpace;
            }
        }

        let includeLowercaseCharValidity = true;
        if (this.specialOptions.withLowercaseChar !== undefined) {
            const hasLowercaseChar = /[a-z]/g.test(data);

            if (this.specialOptions.withLowercaseChar && !hasLowercaseChar) {
                (messages as Map<string, object | undefined>).set('messages.input-lowercase-char-required', undefined);
                includeLowercaseCharValidity = hasLowercaseChar;
            }

            if (!this.specialOptions.withLowercaseChar && hasLowercaseChar) {
                (messages as Map<string, object | undefined>).set('messages.input-lowercase-char-disallowed', undefined);
                includeLowercaseCharValidity = !hasLowercaseChar;
            }
        }

        let includeUppercaseCharValidity = true;
        if (this.specialOptions.withUppercaseChar !== undefined) {
            const hasUppercaseChar = /[A-Z]/g.test(data);

            if (this.specialOptions.withUppercaseChar && !hasUppercaseChar) {
                (messages as Map<string, object | undefined>).set('messages.input-uppercase-char-required', undefined);
                includeUppercaseCharValidity = hasUppercaseChar;
            }

            if (!this.specialOptions.withUppercaseChar && hasUppercaseChar) {
                (messages as Map<string, object | undefined>).set('messages.input-uppercase-char-disallowed', undefined);
                includeUppercaseCharValidity = !hasUppercaseChar;
            }
        }

        let includeNumberValidity = true;
        if (this.specialOptions.withNumber !== undefined) {
            const hasNumber = /[0-9]/g.test(data);

            if (this.specialOptions.withNumber && !hasNumber) {
                (messages as Map<string, object | undefined>).set('messages.input-number-required', undefined);
                includeNumberValidity = hasNumber;
            }

            if (!this.specialOptions.withNumber && hasNumber) {
                (messages as Map<string, object | undefined>).set('messages.input-number-disallowed', undefined);
                includeNumberValidity = !hasNumber;
            }
        }

        let includeSpecialCharValidity = true;
        if (this.specialOptions.specialCharsToInclude) {
            const hasSpecialChar = /[^a-zA-Z_\d\s:\u00C0-\u00FF]+/g.test(data);
            const hasRequiredSpecialChars = this.specialOptions.specialCharsToInclude.split('').some(c => data.includes(c)) || hasSpecialChar;

            let dataWithoutSpecialChars = data.slice();
            this.specialOptions.specialCharsToInclude.split('').every(c => dataWithoutSpecialChars = dataWithoutSpecialChars.includes(c) ? dataWithoutSpecialChars.replaceAll(c, '') : dataWithoutSpecialChars);
            const hasOtherSpecialChars = this.specialOptions.specialCharsToInclude
                ? new RegExp(`[^\\d\\w\\s]+`, 'g').test(dataWithoutSpecialChars)
                : false;

            if (this.specialOptions.withSpecialChar === undefined) {
                includeSpecialCharValidity = !hasSpecialChar ? true : (
                    this.specialOptions.specialCharsToInclude ? hasRequiredSpecialChars && !hasOtherSpecialChars : true
                );
                if (!includeSpecialCharValidity) (messages as Map<string, object | undefined>).set(`messages.input-with-special-chars-may-include`, {chars: this.specialOptions.specialCharsToInclude});
            } else if (!this.specialOptions.withSpecialChar && hasSpecialChar) {
                (messages as Map<string, object | undefined>).set('messages.input-special-char-disallowed', undefined);
                includeSpecialCharValidity = !hasSpecialChar;
            } else if (
                (this.specialOptions.withSpecialChar && !hasSpecialChar) ||
                (hasSpecialChar && !hasRequiredSpecialChars) ||
                (hasSpecialChar && hasRequiredSpecialChars && hasOtherSpecialChars)
            ) {
                const messageKey = this.specialOptions.specialCharsToInclude ? 'input-with-required-special-chars-must-include' : 'input-with-special-chars-must-include';
                (messages as Map<string, object | undefined>).set(`messages.${messageKey}`, {chars: this.specialOptions.specialCharsToInclude});
                includeSpecialCharValidity = false;
            }
        }

        let passwordMatching = true;
        if (this.specialOptions.isPassword) {
            (messages as Map<string, object | undefined>).delete('messages.input-among');
            passwordMatching = this.options.among?.includes(data) ?? false;
            if (!passwordMatching) (messages as Map<string, object | undefined>).set('messages.input-is-password', undefined);
        }

        isValid = isValid && includeLowercaseCharValidity && includeUppercaseCharValidity &&
            includeNumberValidity && includeSpecialCharValidity && allowSpaceValidity;

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
        const isEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi.test(data);
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

        const isUrl = /^(http(s)?:\/\/.)?(ww[w|\d]\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_,\\+.~#?&/=]*)$/gi.test(data);
        if (!isUrl) (messages as Map<string, object | undefined>).set('messages.input-url-format', undefined);

        isValid = isValid && isUrl;

        return {
            isValid,
            messages: isValid ? undefined : messages,
        };
    }
}

export class FileValidator<T extends File | Blob> {
    options: TFileOption;
    input: InputData<T>;

    constructor(input: InputData<T>, options: TFileOption) {
        if (!options.maxSize && !options.acceptedFormats)
            throw new Error('FileValidator: invalid options - `maxSize` and `acceptedFormats` cannot be both undefined.');

        this.input = input;
        this.options = options;
    }

    public validate(): TFieldResult {
        let messages: Map<string, object | undefined> | undefined = new Map<string, object | undefined>();
        const data = this.input.data as File | Blob;

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

export class FileListValidator<T extends FileList | Array<File> | Array<Blob>> {
    options: TFileListOption;
    input: InputData<T>;

    constructor(input: InputData<T>, options: TFileListOption) {
        if (!options.maxSize && !options.acceptedFormats)
            throw new Error('FileListValidator: invalid options - `maxSize` and `acceptedFormats` cannot be both undefined.');

        this.input = input;
        this.options = options;
    }

    public validate(): TFieldResult {
        let isValid = true;
        let messages: Map<string, object | undefined> | undefined = new Map<string, object>();

        const data = Array.from(this.input.data as FileList | Array<File> | Array<Blob>);

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
            const file = data.at(i) as File | Blob;

            let maxSizeValidity = true;
            if (this.options.maxSize) {
                maxSizeValidity = file.size <= this.options.maxSize;
                if (!maxSizeValidity) messages.set('messages.input-files-max-size', {
                    name: 'name' in file ? file.name : 'N/A',
                    size: this.options.maxSize / 1000,
                });
            }

            let acceptedFormatsValidity = true;
            if (this.options.acceptedFormats) {
                acceptedFormatsValidity = this.options.acceptedFormats.some(format => file.type.includes(format));
                if (!acceptedFormatsValidity) messages.set('messages.input-files-accepted-formats', {
                    name: 'name' in file ? file.name : 'N/A',
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
    RangeValidator = 'RangeValidator',
    DateValidator = 'DateValidator',
    SpecialValidator = 'SpecialValidator',
    EmailValidator = 'EmailValidator',
    UrlValidator = 'UrlValidator',
    FileValidator = 'FileValidator',
    FileListValidator = 'FileListValidator',
}

export type TValidatorOption<T> = {
    [key in keyof T]: |
        TRangeOption |
        TSpecialOption |
        TDateOption |
        TFileOption |
        TFileListOption;
}

export type TValidatorOptionsMapFn<T> = (
    publicData?: IPublicData,
    extra?: unknown,
) => TValidatorOption<T>;

export type TFormDataState<T> = {
    [key in keyof T]: {
        value: string | Date | DateTime | File | FileList | undefined;
        caption?: string | undefined;
    };
};

export const mapFieldsToValidators = <T>(
    formData: TFormDataState<T>,
    publicData: IPublicData,
    validatorOptionsMapFn: TValidatorOptionsMapFn<T>,
    field: keyof T,
    validatorName: string,
    dateFormats?: TDateFormat,
    extra?: unknown,
): TFieldToValidatorMap<T> => {
    let validator;
    switch (validatorName) {
        case ValidatorNames.RangeValidator:
            validator = new RangeValidator(
                new InputData<string>(formData[field].value as string | undefined),
                validatorOptionsMapFn(publicData, extra)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.DateValidator:
            if (!dateFormats) throw Error('dateFormats is undefined when using DateValidator.');
            validator = new DateValidator(
                new InputData<Date>(formData[field].value as Date | undefined),
                validatorOptionsMapFn(publicData, extra)[field] as TDateOption,
                dateFormats,
            );
            break;
        case ValidatorNames.SpecialValidator:
            const validatorOptions = validatorOptionsMapFn(publicData, extra)[field] as TRangeOption & TSpecialOption;
            if (validatorOptions.isPassword) {
                const passwordConfirmValue = formData['PasswordConfirm' as keyof T].value;
                validatorOptions.among = passwordConfirmValue ? [passwordConfirmValue] as Array<string> : undefined;
            }

            validator = new SpecialValidator(new InputData<string>(formData[field].value as string | undefined), validatorOptions);
            break;
        case ValidatorNames.EmailValidator:
            validator = new EmailValidator(
                new InputData<string>(formData[field].value as string | undefined),
                validatorOptionsMapFn(publicData, extra)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.UrlValidator:
            validator = new UrlValidator(
                new InputData<string>(formData[field].value as string | undefined),
                validatorOptionsMapFn(publicData, extra)[field] as TRangeOption,
            );
            break;
        case ValidatorNames.FileValidator:
            validator = new FileValidator(
                new InputData<File>(formData[field].value as File | undefined),
                validatorOptionsMapFn(publicData, extra)[field] as TFileOption,
            );
            break;
        case ValidatorNames.FileListValidator:
            validator = new FileListValidator(
                new InputData<FileList>(formData[field].value as FileList | undefined),
                validatorOptionsMapFn(publicData, extra)[field] as TFileListOption,
            );
            break;
        default:
            validator = undefined;
            break;
    }

    return validator;
};

export type TAnyValidator = |
    undefined |
    RangeValidator |
    DateValidator |
    SpecialValidator |
    EmailValidator |
    UrlValidator |
    FileValidator |
    FileListValidator;

export type TFieldToValidatorMap<T> = {
    [key in keyof T]: TAnyValidator;
};
