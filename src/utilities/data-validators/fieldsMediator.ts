import { TAnyValidator, TFieldValidatorMap } from 'src/utilities/data-validators/dataValidators';
import _remove from 'lodash/remove';

export type TFieldResult = {
    isValid: boolean | undefined,
    messages?: Array<string> | Map<string, object | undefined>,
};

export type TFormResult = {
    isValid: boolean,
    messages?: Map<string, object>,
};

export type TValidationResult<T> = {
    [key in keyof T] : TFieldResult;
};

export type TValidationOptions<T> = {
    // Exactly 1 of the specified fields must have valid value, the others must be empty
    oneOfFields?: Array<keyof T>,
    // These fields can either have valid values or be empty
    optionalFields?: Array<keyof T>,
};

// Mediator pattern: an intermediate actor to help fields in the form communicate with each other
class FieldsMediator<T> {

    private readonly validatorsMap: TFieldValidatorMap<T>;
    private validationResult?: TValidationResult<T>;
    // If no validationOptions, consider all fields as required, otherwise, consider the fields specified as ruled by validationOptions
    private validationOptions?: TValidationOptions<T>;

    constructor(validatorsMap: TFieldValidatorMap<T>, validationOptions?: TValidationOptions<T>) {
        this.validatorsMap = validatorsMap;
        this.validationOptions = validationOptions;
    }

    public notifyValidationResult(): TValidationResult<T> {
        const fieldNames = Object.keys(this.validatorsMap);
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const results: any = {};

        fieldNames.forEach(fieldName => {
            const validator: TAnyValidator = this.validatorsMap[fieldName as keyof T];

            if (validator?.input.data === undefined || validator?.input.data === '') results[fieldName] = { isValid: undefined } as TFieldResult;
            else results[fieldName] = validator.validate();
        });

        this.validationResult = results;
        return results;
    }

    public validateForm(): TFormResult {
        if (this.validationResult === undefined) return { isValid: false };

        const { oneOfFields, optionalFields } = this.validationOptions ?? {};
        const fieldNames = Object.keys(this.validationResult);

        let fieldNamesByOneOfFields = new Array<string>();
        if (Boolean(oneOfFields)) fieldNamesByOneOfFields = _remove(fieldNames, (field) => oneOfFields!.includes(field as keyof T));

        let isValidByOneOfFields = true;
        if (fieldNamesByOneOfFields.length) {
            const resultCounts = {
                validCount: 0,
                undefinedCount: 0,
            };

            for (const fieldName of fieldNamesByOneOfFields) {
                const fieldResult: TFieldResult = this.validationResult[fieldName as keyof T];

                if (fieldResult.isValid === true) resultCounts.validCount += 1;
                if (fieldResult.isValid === undefined) resultCounts.undefinedCount += 1;

                if (resultCounts.validCount > 1) break;
            }

            isValidByOneOfFields =
                resultCounts.validCount === 1 &&
                resultCounts.validCount + resultCounts.undefinedCount === fieldNamesByOneOfFields.length;
        }

        let fieldNamesByOptionalFields = new Array<string>();
        if (Boolean(optionalFields)) fieldNamesByOptionalFields = _remove(fieldNames, (field) => optionalFields!.includes(field as keyof T));

        let isValidByOptionalFields = true;
        if (fieldNamesByOptionalFields.length)
            for (const fieldName of fieldNamesByOptionalFields) {
                const fieldResult: TFieldResult = this.validationResult[fieldName as keyof T];

                isValidByOptionalFields = isValidByOptionalFields && (fieldResult.isValid === undefined || fieldResult.isValid);
                if (!isValidByOptionalFields) break;
            }

        let isValidByRequiredFields = true;
        for (const fieldName of fieldNames) {
            const fieldResult: TFieldResult = this.validationResult[fieldName as keyof T];

            isValidByRequiredFields = isValidByRequiredFields && fieldResult.isValid === true;
            if (!isValidByRequiredFields) break;
        }

        const isValid = isValidByRequiredFields && isValidByOneOfFields && isValidByOptionalFields;

        return {
            isValid,
            messages: isValid ? undefined : (
                isValidByOneOfFields
                    ? undefined
                    : new Map<string, object>(Object.entries({'messages.input-one-of-fields': { fields: oneOfFields!.join(', ') }}))
            ),
        };
    }
}

export default FieldsMediator;
