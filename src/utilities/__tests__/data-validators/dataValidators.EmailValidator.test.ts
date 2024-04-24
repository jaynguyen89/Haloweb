import {
    EmailValidator,
    InputData,
    TRangeOption,
} from 'src/utilities/data-validators/dataValidators';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';

describe('dataValidators.ts > EmailValidator', () => {
    it('returns `valid` for correct formats of email addresses', () => {
        const options: TRangeOption = { min: 10, max: 50 };
        const inputs = [
            new InputData('email@domain.com'),
            new InputData('$amble%1@domain.a.b.c.d'),
            new InputData('email-address@do-main.com'),
            new InputData('email.address@doma1n.c0m.ex'),
            new InputData('email_{address}@domain.c0'),
            new InputData('3ma!l+add?ess#1@do-main.c-mv'),
            new InputData('em~il^address*1@dom.com'),
            new InputData('email`add`ress&1@dom.com'),
            new InputData('sambl3/email@ex.com'),
        ];

        const results = inputs.map(input => {
            const validator = new EmailValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeTruthy());
    });

    it('returns `invalid` for incorrect formats of email addresses', () => {
        const options: TRangeOption = { min: 10, max: 50 };
        const inputs = [
            new InputData('email@domain..com'),
            new InputData('$amble%1@@domain.a.b.c.d'),
            new InputData('email-address@do-main@com'),
            new InputData('@email.address@doma1n.c0m.ex'),
            new InputData('em@il_{address}@domain.c0'),
            new InputData('3ma!l?address#1@do-main?c-mv'),
            new InputData('sambl3/email@ex_ample.com'),
        ];

        const results = inputs.map(input => {
            const validator = new EmailValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-email-format', undefined]]),
        };

        results.forEach(result => expect(result).toEqual(expectation));
    });
});
