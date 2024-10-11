import { TAnyValidator, TFieldToValidatorMap } from 'src/utilities/data-validators/dataValidators';
import _flatten from 'lodash/flatten';
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

export type TFieldMediatorOptions<T> = {
    // Exactly 1 of the specified fields must have valid value, the others must be undefined
    // If a child array is specified, all its items must be either valid or undefined
    oneOfFields?: Array<keyof T | Array<keyof T>>,
    // These fields can either have valid values or be empty
    optionalFields?: Array<keyof T>,
};

// Mediator pattern: an intermediate actor to help all fields in the form communicate with each other
class FieldsMediator<T> {

    private readonly validatorsMap: TFieldToValidatorMap<T>;
    private validationResult?: TValidationResult<T>;
    // If no validationOptions, consider all fields as required, otherwise, consider the fields specified as ruled by validationOptions
    private readonly validationOptions?: TFieldMediatorOptions<T>;

    constructor(validatorsMap: TFieldToValidatorMap<T>, validationOptions?: TFieldMediatorOptions<T>) {
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

        let isValidByOneOfFields = true;
        if (oneOfFields) {
            const flattenedOneOfFields = _flatten(oneOfFields);
            _remove(fieldNames, (field) => flattenedOneOfFields.includes(field as keyof T));

            const resultCounts = {
                validCount: 0,
                undefinedCount: 0,
            };

            for (const entry of oneOfFields) {
                if (typeof entry === 'string') {
                    const fieldResult: TFieldResult = this.validationResult[entry as keyof T];

                    if (fieldResult.isValid === true) resultCounts.validCount += 1;
                    if (fieldResult.isValid === undefined) resultCounts.undefinedCount += 1;
                }
                else {
                    const allItemsValid = (entry as Array<keyof T>).every(item => {
                        const fieldResult: TFieldResult = this.validationResult![item as keyof T];
                        return fieldResult.isValid === true;
                    });

                    const allItemsUndefined = (entry as Array<keyof T>).every(item => {
                        const fieldResult: TFieldResult = this.validationResult![item as keyof T];
                        return fieldResult.isValid === undefined;
                    });

                    if (!allItemsValid && !allItemsUndefined) resultCounts.validCount = 2; // set 2 to instantly end this validation
                    else if (allItemsValid) resultCounts.validCount += 1;
                    else if (allItemsUndefined) resultCounts.undefinedCount += 1;
                }

                if (resultCounts.validCount > 1) break;
            }

            isValidByOneOfFields =
                resultCounts.validCount === 1 &&
                resultCounts.validCount + resultCounts.undefinedCount === oneOfFields.length;

            if (!isValidByOneOfFields) return {
                isValid: false,
                messages: new Map<string, object>(Object.entries({'messages.input-one-of-fields': { fields: flattenedOneOfFields.join(', ') }})),
            };
        }

        let isValidByOptionalFields = true;
        if (optionalFields) {
            _remove(fieldNames, (field) => optionalFields!.includes(field as keyof T));

            for (const fieldName of optionalFields) {
                const fieldResult: TFieldResult = this.validationResult[fieldName as keyof T];

                isValidByOptionalFields = isValidByOptionalFields && (fieldResult.isValid === undefined || fieldResult.isValid);
                if (!isValidByOptionalFields) break;
            }

            if (!isValidByOptionalFields) return { isValid: false };
        }

        let isValidByRequiredFields = true;
        for (const fieldName of fieldNames) {
            const fieldResult: TFieldResult = this.validationResult[fieldName as keyof T];

            isValidByRequiredFields = isValidByRequiredFields && fieldResult.isValid === true;
            if (!isValidByRequiredFields) break;
        }

        return { isValid: isValidByRequiredFields };
    }
}

export default FieldsMediator;
