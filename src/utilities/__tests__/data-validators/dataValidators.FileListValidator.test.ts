import { FileListValidator, InputData, TFileListOption } from 'src/utilities/data-validators/dataValidators';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';
import { Blob } from 'blob-polyfill';

describe('FileListValidator', () => {
    const options: TFileListOption = {
        minCount: 1,
        maxCount: 2,
        maxSize: 10000,
        acceptedFormats: ['png', 'json', 'mp3'],
    };

    const file1 = new Blob([], { type: 'image/png' });
    file1.name = 'test1.png';
    Object.defineProperty(file1, 'size', { value: 10000, writable: false });

    const file2 = new Blob([], { type: 'application/json' });
    file2.name = 'test2.json';
    Object.defineProperty(file2, 'size', { value: 10000, writable: false });

    const file3 = new Blob([], { type: 'audio/mp3' });
    file3.name = 'test3.mp3';
    Object.defineProperty(file3, 'size', { value: 10000, writable: false });

    const file4 = new Blob([], { type: 'image/gif' });
    // @ts-ignore
    file4.name = 'test4.gif';
    Object.defineProperty(file4, 'size', { value: 10001, writable: false });

    it('should throw error for invalid validation options', () => {
        const input = new InputData([file1]);
        const test = () => new FileListValidator(input, {});

        expect(test).toThrow();
    });

    it('restricts the number of files according to `minCount` and `maxCount`', () => {
        const minValidator = new FileListValidator(new InputData(new Array<File>()), options);
        const minExpectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-files-min-count', { count: options.minCount }]]),
        };
        expect(minValidator.validate()).toEqual(minExpectation);

        const maxValidator = new FileListValidator(new InputData([file1, file2, file3]), options);
        const maxExpectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-files-max-count', { count: options.maxCount }]]),
        };
        expect(maxValidator.validate()).toEqual(maxExpectation);

        const validValidator = new FileListValidator(new InputData([file2, file3]), options);
        expect(validValidator.validate().isValid).toBeTruthy();
    });

    it('restricts file size and formats according to `maxSize` and `acceptedFormats`', () => {
        const validValidator = new FileListValidator(new InputData([file2, file3]), options);
        expect(validValidator.validate()).toBeTruthy();

        const invalidValidator = new FileListValidator(new InputData([file4]), options);
        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([
                ['messages.input-files-max-size', {
                    name: file4.name,
                    size: options.maxSize! / 1000,
                }],
                ['messages.input-files-accepted-formats', {
                    name: file4.name,
                    formats: options.acceptedFormats?.join(', '),
                }],
            ]),
        };
        expect(invalidValidator.validate()).toEqual(expectation);
    });
});
