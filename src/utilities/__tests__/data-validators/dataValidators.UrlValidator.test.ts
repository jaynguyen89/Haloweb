import { InputData, TRangeOption, UrlValidator } from 'src/utilities/data-validators/dataValidators';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';

describe('dataValidators.ts > UrlValidator', () => {
    it('returns `valid` for correct format of HTTP urls', () => {
        const options: TRangeOption = { min: 10, max: 100 };
        const inputs = [
            new InputData('http://ww1.example.domain.com'),
            new InputData('https://example.domain.com?key1=value'),
            new InputData('http://s0meth1ng.d0ma1n.com/param/%20%/some+thing#else'),
            new InputData('https://some.com.ex/123.45/param/any-thing?key1=%20%&key-two=some.where'),
            new InputData('http://any-thing.d0ma1n?array=#one,(two),~three&email=test@mail.com'),
            new InputData('ww2.s0me-thing.d0m#dir3ct0ry=\\path\\to\\file'),
            new InputData('example.domain.com'),
        ];

        const results = inputs.map(input => {
            const validator = new UrlValidator(input, options);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeTruthy());
    });

    it('returns `invalid` for incorrect format of HTTP urls', () => {
        const options: TRangeOption = { min: 10, max: 100 };
        const inputs = [
            new InputData('httpx://ww1.example.domain.com'),
            new InputData('ftp://example.domain.com?key1=value'),
            new InputData('htt://s0meth1ng.d0ma1n.com/param/%20%/some+thing#else'),
            new InputData('https://some.com.ex/1^3/param/any-thing?key1=%20%&key-two=some.where'),
            new InputData('http://thử-nghiệm.d0ma1n?array=#one,(two),~three&email=test@mail.com'),
        ];

        const results = inputs.map(input => {
            const validator = new UrlValidator(input, options);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, undefined>([['messages.input-url-format', undefined]]),
        };

        results.forEach(result => expect(result).toEqual(expectation));
    });
});
