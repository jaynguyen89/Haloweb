import FieldsMediator, {
    TFormResult,
    TValidationOptions,
    TValidationResult,
} from 'src/utilities/data-validators/fieldsMediator';
import {
    expectation as validators, file1, file2,
    MockFieldNames, mockValidatorOptionsMap,
    TMockFieldKey,
} from 'src/utilities/__tests__/data-validators/_mocks_';
import { TFileListOption, TFileOption, TSpecialOption } from 'src/utilities/data-validators/dataValidators';
import _flatten from 'lodash/flatten';

describe('FieldsMediator', () => {
    const validationOptions: TValidationOptions<TMockFieldKey> = {
        oneOfFields: [
            MockFieldNames.Email,
            [
                MockFieldNames.Name,
                MockFieldNames.Phone,
            ],
        ],
        optionalFields: [
            MockFieldNames.DateTime,
            MockFieldNames.Url,
            MockFieldNames.Text,
        ],
    };

    const mediator = new FieldsMediator(validators, validationOptions);

    it('should produce correct validation results', () => {
        const expectation: TValidationResult<TMockFieldKey> = {
            [MockFieldNames.Name]: {
                isValid: false,
                messages: new Map<string, object>([
                    ['messages.input-max-as-string', {
                        max: (mockValidatorOptionsMap[MockFieldNames.Name] as TSpecialOption).max,
                    }],
                ]),
            },
            [MockFieldNames.DateTime]: {
                isValid: true,
                messages: undefined,
            },
            [MockFieldNames.Password]: {
                isValid: false,
                messages: new Map<string, undefined>([['messages.input-is-password', undefined]]),
            },
            [MockFieldNames.Email]: {
                isValid: true,
                messages: undefined,
            },
            [MockFieldNames.Phone]: {
                isValid: true,
                messages: undefined,
            },
            [MockFieldNames.Url]: {
                isValid: true,
                messages: undefined,
            },
            [MockFieldNames.File]: {
                isValid: false,
                messages: new Map<string, object>([
                    ['messages.input-file-accepted-formats', {
                        formats: (mockValidatorOptionsMap[MockFieldNames.File] as TFileOption).acceptedFormats?.join(', '),
                    }],
                ]),
            },
            [MockFieldNames.FileList]: {
                isValid: false,
                messages: new Map<string, object>([
                    ['messages.input-files-max-size', {
                        name: file1.name,
                        size: (mockValidatorOptionsMap[MockFieldNames.FileList] as TFileListOption).maxSize! / 1000,
                    }],
                    ['messages.input-files-accepted-formats', {
                        name: file2.name,
                        formats: (mockValidatorOptionsMap[MockFieldNames.FileList] as TFileListOption).acceptedFormats?.join(', '),
                    }],
                ]),
            },
            [MockFieldNames.Text]: { isValid: undefined },
        };

        expect(mediator.notifyValidationResult()).toEqual(expectation);
    });

    it('should validate form correctly by `oneOfFields`', () => {
        const expectation: TFormResult = {
            isValid: false,
            messages: new Map<string, object>([
                ['messages.input-one-of-fields', { fields: _flatten(validationOptions.oneOfFields).join(', ') }],
            ]),
        };

        mediator.notifyValidationResult();
        expect(mediator.validateForm()).toEqual(expectation);
    });

    it('should validate form correctly by `optionalFields`', () => {
        const options: TValidationOptions<TMockFieldKey> = {
            optionalFields: [
                MockFieldNames.DateTime,
                MockFieldNames.Url,
                MockFieldNames.Text,
            ],
        };

        const mediator = new FieldsMediator(validators, options);
        mediator.notifyValidationResult();
        expect(mediator.validateForm()).toEqual({ isValid: false });
    });

    it('should validate form correctly by required fields', () => {
        const mediator = new FieldsMediator(validators);
        mediator.notifyValidationResult();
        expect(mediator.validateForm()).toEqual({ isValid: false });
    });
});
