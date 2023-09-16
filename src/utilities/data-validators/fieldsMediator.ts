import { TAnyValidator, TFieldValidatorMap } from 'src/utilities/data-validators/dataValidators';

export type TResult = {
    isValid: boolean | undefined,
    messages?: Array<string> | Map<string, object | undefined>,
};

export type ValidationResult<T> = {
    [key in keyof T] : TResult;
};

// Mediator pattern: an intermediate actor to help fields in the form communicate with each other
class FieldsMediator<T> {

    private readonly validatorsMap: TFieldValidatorMap<T>;

    constructor(validatorsMap: TFieldValidatorMap<T>) {
        this.validatorsMap = validatorsMap;
    }

    public notifyValidationResult(): ValidationResult<T> {
        const fieldNames = Object.keys(this.validatorsMap);
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const results: any = {};

        fieldNames.forEach(fieldName => {
            const validator: TAnyValidator = this.validatorsMap[fieldName as keyof T];

            if (validator?.input.data === undefined || validator?.input.data === '') results[fieldName] = { isValid: undefined } as TResult;
            else results[fieldName] = validator.validate();
        });

        return results;
    }
}

export default FieldsMediator;

export const isFormDataValid = <T>(validationResults: ValidationResult<T>): boolean => {
    const fieldNames = Object.keys(validationResults);
    let isValid = true;

    for (const fieldName of fieldNames) {
        const fieldResult: TResult = validationResults[fieldName as keyof T];
        isValid = isValid && fieldResult.isValid === true;
        if (!isValid) break;
    }

    return isValid;
};
