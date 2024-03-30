import {
    InputData,
    SpecialValidator,
    TRangeOption,
    TSpecialOption,
} from 'src/utilities/data-validators/dataValidators';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';

describe('SpecialValidator', () => {
    it('returns `valid` for texts with or without space when withSpace === undefined', () => {
        const options: TSpecialOption = { withSpace: undefined };
        const inputs = [
            new InputData('0123456789'),
            new InputData('0123 4568789'),
            new InputData('012ABC!@#'),
            new InputData('Something'),
            new InputData('Something else'),
        ];

        const results = inputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeTruthy());
    });

    it('should enforce texts to have spaces when withSpace === true', () => {
        const options: TSpecialOption = { withSpace: true };
        const validInputs = [
            new InputData('0123 4568789'),
            new InputData('Something else'),
            new InputData('123 Abc !@#'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('01234568789'),
            new InputData('Something'),
            new InputData('123Abc!@#'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-space-required', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce texts to not have spaces when withSpace === false', () => {
        const options: TSpecialOption = { withSpace: false };
        const validInputs = [
            new InputData('01234568789'),
            new InputData('Something'),
            new InputData('123Abc!@#'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('0123 4568789'),
            new InputData('Something else'),
            new InputData('123 Abc !@#'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-space-disallowed', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for texts with or without lowercase chars when withLowercaseChar === undefined', () => {
        const options: TSpecialOption = { withLowercaseChar: undefined };
        const inputs = [
            new InputData('lowercase only'),
            new InputData('With Uppercase Chars'),
            new InputData('W!th Spec!al Ch@rs.'),
        ];

        const results = inputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeTruthy());
    });

    it('should enforce texts to have lowercase chars when withLowercaseChar === true', () => {
        const options: TSpecialOption = { withLowercaseChar: true };

        const validInputs = [
            new InputData('lowercase only'),
            new InputData('W1th numb3rs'),
            new InputData('W!th Special Ch@rs.'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('UPPERCASE ONLY'),
            new InputData('W1TH NUMB3RS'),
            new InputData('W!TH SPEC!AL CH@RS.'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-lowercase-char-required', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce texts to not have lowercase chars when withLowercaseChar === false', () => {
        const options: TSpecialOption = { withLowercaseChar: false };

        const validInputs = [
            new InputData('UPPERCASE ONLY'),
            new InputData('W1TH NUMB3RS'),
            new InputData('W!TH SPEC!AL CH@RS.'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('lowercase only'),
            new InputData('W1th numb3rs'),
            new InputData('W!th Special Ch@rs.'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-lowercase-char-disallowed', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for texts with or without uppercase chars when withUppercaseChar === undefined.', () => {
        const options: TSpecialOption = { withUppercaseChar: undefined };
        const inputs = [
            new InputData('lowercase only'),
            new InputData('With Uppercase Chars'),
            new InputData('W!th Spec!al Ch@rs.'),
        ];

        const results = inputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeTruthy());
    });

    it('should enforce texts to have uppercase chars when withUppercaseChar === true', () => {
        const options: TSpecialOption = { withUppercaseChar: true };

        const validInputs = [
            new InputData('UPPERCASE ONLY'),
            new InputData('W1th Numb3rs'),
            new InputData('W!th Special Ch@rs.'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('lowercase only'),
            new InputData('w1th numb3rs'),
            new InputData('w!th spec!al ch@rs.'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-uppercase-char-required', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce texts to not have uppercase chars when withUppercaseChar === false', () => {
        const options: TSpecialOption = { withUppercaseChar: false };

        const validInputs = [
            new InputData('lowercase only'),
            new InputData('w1th numb3rs'),
            new InputData('w!th spec!al ch@rs.'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('UPPERCASE ONLY'),
            new InputData('W1th Numb3rs'),
            new InputData('W!th Special Ch@rs.'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-uppercase-char-disallowed', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for texts with or without numbers when withNumber === undefined', () => {
        const options: TSpecialOption = { withNumber: undefined };
        const inputs = [
            new InputData('Alphabets Only'),
            new InputData('1234567890'),
            new InputData('W1th Sp3c!al Ch@rs.'),
        ];

        const results = inputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeTruthy());
    });

    it('should enforce texts to have numbers when withNumber === true', () => {
        const options: TSpecialOption = { withNumber: true };

        const validInputs = [
            new InputData('H5ve Numb3r8'),
            new InputData('1234567890'),
            new InputData('W1th Sp36ial Ch@r8.'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('Alphabets Only'),
            new InputData('W!th Spec!al Ch@rs.'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-number-required', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce texts to not have numbers when withNumber === false', () => {
        const options: TSpecialOption = { withNumber: false };

        const validInputs = [
            new InputData('Alphabets Only'),
            new InputData('W!th Spec!al Ch@rs.'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('H5ve Numb3r8'),
            new InputData('1234567890'),
            new InputData('W1th Sp36ial Ch@r8.'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-number-disallowed', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for texts with or without special chars when withSpecialChar === undefined', () => {
        const options: TSpecialOption = { withSpecialChar: undefined };
        const inputs = [
            new InputData('Alphabets Only'),
            new InputData('1234567890'),
            new InputData('W1th Sp3c!al Ch@rs.'),
            new InputData('!#@&^@(}{>'),
        ];

        const results = inputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeTruthy());
    });

    it('should enforce texts, if having any special chars, ' +
        'to have only the required special chars ' +
        'when withSpecialChar === undefined and specialCharsToInclude !== undefined',
        () => {
        const options: TSpecialOption = {
            withSpecialChar: undefined,
            specialCharsToInclude: '!@#$%^&*()',
        };
        const validInputs = [
            new InputData('Alphabets Only'),
            new InputData('1234567890'),
            new InputData('W1th $p3c!al Ch@rs & num13er'),
            new InputData('!@$^)'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('W1th [Other] $pec!al Chars.'),
            new InputData('(*%<?'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-with-special-chars-may-include', { chars: options.specialCharsToInclude }]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce texts to not have special chars when withSpecialChar === false', () => {
        const options: TSpecialOption = { withSpecialChar: false };

        const validInputs = [
            new InputData('Alphabets Only'),
            new InputData('H5ve Numb3r8'),
            new InputData('1234567890'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('W!th Spec!al Ch@rs.'),
            new InputData('W1th Sp36ial Ch@r8.'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-special-char-disallowed', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce texts to have special chars when withSpecialChar === true', () => {
        const options: TSpecialOption = { withSpecialChar: true };

        const validInputs = [
            new InputData('W!th Spec!al Ch@rs & numb3r.'),
            new InputData('~`!@#$%^&*())_+-={}|[]\\;\':",./<>?'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('Alphabets Only'),
            new InputData('H5ve Numb3r8'),
            new InputData('1234567890'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-with-special-chars-must-include', { chars: undefined }]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce texts to have required special chars when withSpecialChar === true and specialCharsToInclude !== undefined', () => {
        const options: TSpecialOption = {
            withSpecialChar: true,
            specialCharsToInclude: '!@#$%^&*()',
        };

        const validInputs = [
            new InputData('W!th $pec!al (h@rs & numb3r'),
            new InputData('@$%*)'),
        ];

        const validResults = validInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidInputs = [
            new InputData('Alphabets Only'),
            new InputData('H5ve Numb3r8'),
            new InputData('1234567890'),
            new InputData('W1th [Other] $pec!al Chars.'),
            new InputData('(*%<?'),
        ];

        const invalidResults = invalidInputs.map(input => {
            const validator = new SpecialValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-with-required-special-chars-must-include', { chars: options.specialCharsToInclude }]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });

    it('should enforce matching texts in case of isPassword === true', () => {
        const options: TSpecialOption & TRangeOption = {
            isPassword: true,
            withSpecialChar: true,
            specialCharsToInclude: '!@#$%^&*()',
        };

        const validInputs = ['T3st!ng', 'P@ssw0rd'];

        const validResults = validInputs.map(input => {
            options.among = [input];
            const validator = new SpecialValidator(new InputData(input), options);
            return validator.validate();
        });

        validResults.forEach(result => expect(result.isValid).toBeTruthy());

        const invalidResults = validInputs.map(input => {
            options.among = [input + ' any'];
            const validator = new SpecialValidator(new InputData(input), options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-is-password', undefined]]),
        };

        invalidResults.forEach(result => expect(result).toEqual(expectation));
    });
});
