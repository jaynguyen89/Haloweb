import { InputData, RangeValidator, TRangeOption } from 'src/utilities/data-validators/dataValidators';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';

describe('dataValidators.ts > RangeValidator for Number', () => {
    it('returns `invalid` for non-number inputs', () => {
        const options: TRangeOption = {
            asNumber: true,
            equal: 10,
        };

        const inputs = [
            new InputData('x'),
            new InputData('xx'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-is-nan', undefined]]),
        };

        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for Number inputs within min-max', () => {
        const options: TRangeOption = {
            asNumber: true,
            min: 10,
            max: 20,
        };

        const inputs = [
            new InputData('10'),
            new InputData('11'),
            new InputData('20'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = { isValid: true };
        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `invalid` for Number inputs outside min-max', () => {
        const options: TRangeOption = {
            asNumber: true,
            min: 10,
            max: 20,
        };

        const inputs = [
            new InputData('9'),
            new InputData('21'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation0: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-min-as-number', { min: options.min }]]),
        };
        expect(results[0]).toEqual(expectation0);

        const expectation1: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-max-as-number', { max: options.max }]]),
        };
        expect(results[1]).toEqual(expectation1);
    });

    it('returns `valid` for Number input equalling to a specified number.', () => {
        const validator = new RangeValidator(
            new InputData('10'),
            {
                asNumber: true,
                equal: 10,
            } as TRangeOption,
        );

        expect(validator.validate()).toEqual({ isValid: true });
    });

    it('returns `invalid` for Number input unequalling to a specified number', () => {
        const options: TRangeOption = {
            asNumber: true,
            equal: 10,
        };

        const validator = new RangeValidator(new InputData('1'), options);

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-equal-as-number', { equal: options.equal }]]),
        };

        expect(validator.validate()).toEqual(expectation);
    });

    it('returns `valid` for Number inputs among a set of numbers', () => {
        const options: TRangeOption = {
            asNumber: true,
            among: ['2', '9', '18', '21', '30', '35', '42', '49'],
        };

        const inputs = [
            new InputData('9'),
            new InputData('30'),
            new InputData('42'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = { isValid: true };
        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `invalid` for Number inputs not among a set of numbers', () => {
        const options: TRangeOption = {
            asNumber: true,
            among: ['2', '9', '18', '21', '30', '35', '42', '49'],
        };

        const inputs = [
            new InputData('10'),
            new InputData('40'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation0: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-among', { values: options.among!.join(', ') }]]),
        };
        expect(results[0]).toEqual(expectation0);

        const expectation1: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-among', { values: options.among!.join(', ') }]]),
        };
        expect(results[1]).toEqual(expectation1);
    });
});

describe('dataValidators.ts > RangeValidator for String', () => {
    it('returns `valid` for String inputs with length within min-max', () => {
        const options: TRangeOption = {
            min: 5,
            max: 15,
        };

        const inputs = [
            new InputData('12345'),
            new InputData('something'),
            new InputData('something  else'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for String inputs with length outside min-max', () => {
        const options: TRangeOption = {
            min: 5,
            max: 15,
        };

        const inputs = [
            new InputData('1234'),
            new InputData('This is long string.'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation0: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-min-as-string', { min: options.min }]]),
        };

        expect(results[0]).toEqual(expectation0);

        const expectation1: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-max-as-string', { max: options.max }]]),
        };

        expect(results[1]).toEqual(expectation1);
    });

    it('returns `valid` for String input with length equalling to a specified number', () => {
        const options: TRangeOption = { equal: 8 };
        const validator = new RangeValidator(new InputData('Test1ng!'), options);

        expect(validator.validate()).toEqual({ isValid: true });
    });

    it('returns `invalid` for String input with length unequalling to a specified number', () => {
        const options: TRangeOption = { equal: 8 };

        const inputs = [
            new InputData('1234567'),
            new InputData('Something'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-equal-as-string', { equal: options.equal }]]),
        };
        results.forEach(result => expect(result).toEqual(expectation));
    });
    
    it('returns `valid` for String inputs among a set of strings', () => {
        const options: TRangeOption = {
            among: ['This', 'is', 'the', 'specified' , 'strings'],
        };
        
        const inputs = [
            new InputData('is'),
            new InputData('strings'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for String inputs outside a set of strings', () => {
        const options: TRangeOption = {
            among: ['This', 'is', 'the', 'specified' , 'strings'],
        };

        const inputs = [
            new InputData('some'),
            new InputData('thing'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-among', { values: options.among?.join(', ') }]]),
        };
        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for String inputs containing numbers only', () => {
        const options: TRangeOption = { numbersOnly: true };
        const inputs = [
            new InputData('0'),
            new InputData('000000'),
            new InputData('1234567890',)
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for String inputs not containing only numbers', () => {
        const options: TRangeOption = { numbersOnly: true };
        const inputs = [
            new InputData('-1'),
            new InputData('0.1'),
            new InputData('+1'),
            new InputData('80m3'),
            new InputData('?'),
            new InputData(' '),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-numbers-only', undefined]]),
        };
        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for String inputs containing alphabets only', () => {
        const options: TRangeOption = { alphabetsOnly: true };
        const inputs = [
            new InputData('some'),
            new InputData('some_thing'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for String inputs not containing only alphabets', () => {
        const options: TRangeOption = { alphabetsOnly: true };
        const inputs = [
            new InputData('  '),
            new InputData('t3st'),
            new InputData('test!'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-alphabets-only', undefined]]),
        };
        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for String inputs that is alphanumeric', () => {
        const options: TRangeOption = { alphanumeric: true };
        const inputs = [
            new InputData('s0me'),
            new InputData('s0me_th1ng'),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for String inputs that is not alphanumeric', () => {
        const options: TRangeOption = { alphanumeric: true };
        const inputs = [
            new InputData('s0me_th1ng!'),
            new InputData('0.1'),
            new InputData('+1'),
            new InputData('80!3'),
            new InputData('?'),
            new InputData(' '),
        ];

        const results = inputs.map(input => {
            const validator = new RangeValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-alphanumeric', undefined]]),
        };
        results.forEach(result => expect(result).toEqual(expectation));
    });
});
