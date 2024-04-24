/* eslint-disable  @typescript-eslint/no-explicit-any */
import { mapFieldsToValidators } from 'src/utilities/data-validators/dataValidators';
import { TDateFormat } from 'src/commons/types';
import {
    expectation,
    MockFieldNames, mockFieldToValidatorMap,
    mockFormData,
    mockPublicData,
    mockValidatorOptionsMapFn,
    TMockFieldKey,
} from 'src/utilities/__tests__/data-validators/_mocks_';

describe('dataValidators.ts > mapFieldsToValidators', () => {
    it('should throw for missing `dateFormats` when `DateValidator` is in use', () => {
        const test = () => mapFieldsToValidators<TMockFieldKey>(
            mockFormData,
            mockPublicData,
            mockValidatorOptionsMapFn,
            MockFieldNames.DateTime,
            mockFieldToValidatorMap[MockFieldNames.DateTime]
        );

        expect(test).toThrow();
    });

    it('returns correct validator for each field', () => {
        const validators: any = {};
        Object.values(MockFieldNames)
            .filter(fieldName => fieldName !== MockFieldNames.PasswordConfirm)
            .forEach(fieldName => validators[fieldName] = mapFieldsToValidators(
                mockFormData,
                mockPublicData,
                mockValidatorOptionsMapFn,
                fieldName as keyof TMockFieldKey,
                mockFieldToValidatorMap[fieldName as keyof TMockFieldKey],
                {
                    formats: { date: 0, time: 0 },
                } as TDateFormat,
            ));

        expect(validators).toEqual(expectation);
    });
});
