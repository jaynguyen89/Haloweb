import { FileValidator, InputData, TFileOption } from 'src/utilities/data-validators/dataValidators';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';
import { Blob } from 'blob-polyfill';

describe('dataValidators.ts > FileValidator', () => {
    const options: TFileOption = {
        maxSize: 10000,
        acceptedFormats: ['png'],
    };

    it('should throw error for invalid options', () => {
        const file = new Blob([], { type: 'image/png' });
        file.name = 'test.png';
        const input = new InputData(file);
        const test = () => new FileValidator(input, {});

        expect(test).toThrow();
    });

    it('should enforce file size according to `maxSize`', () => {
        const file1 = new Blob([], { type: 'image/png' });
        file1.name = 'test.png';
        Object.defineProperty(file1, 'size', { value: 10000, writable: false });

        const validator1 = new FileValidator(new InputData(file1), options);
        expect(validator1.validate().isValid).toBeTruthy();

        const file2 = new Blob([], { type: 'image/png' });
        file2.name = 'test.png';
        Object.defineProperty(file2, 'size', { value: 10001, writable: false });

        const validator2 = new FileValidator(new InputData(file2), options);
        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-file-max-size', { size: options.maxSize! / 1000 }]]),
        };

        expect(validator2.validate()).toEqual(expectation);
    });

    it('should enforce file extension according to `acceptedFormats`', () => {
        const file1 = new Blob([], { type: 'image/png' });
        file1.name = 'test.png';
        const validInput = new InputData(file1);

        const validator1 = new FileValidator(validInput, options);
        expect(validator1.validate().isValid).toBeTruthy();

        const file2 = new Blob([], { type: 'image/jpg' });
        file2.name = 'test.png';
        const invalidInput = new InputData(file2);

        const validator2 = new FileValidator(invalidInput, options);
        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-file-accepted-formats', { formats: options.acceptedFormats?.join(', ') }]]),
        };

        expect(validator2.validate()).toEqual(expectation);
    });
});
