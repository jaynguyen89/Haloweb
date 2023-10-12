import { TTranslationMap } from 'src/commons/types';

const enCommons: TTranslationMap = {
    buttons: {
        save: 'Save',
        submit: 'Submit',
        done: 'Done!',
        cancel: 'Cancel',
        update: 'Update',
        delete: 'Delete',
        remove: 'Remove',
        'view-details': 'View Details',
    },
    labels: {
        loading: 'Loading...',
        'please-wait': 'Please wait...',
        'or': 'Or',
        'and': 'And',
    },
    messages: {
        'error-network': 'Network error: please check your internet connection or proxy configurations.',
        'error-500': '500 - An unknown issue has happened in our side. Please try again later.',
        'error-501': '501 - The requested feature is unavailable in our side.',
        'input-is-nan': 'Your input is not a number. Please enter a number.',
        'input-min-as-number': 'Input should be higher than the smallest accepted value ({{min}}).',
        'input-min-as-string': 'Input length should be longer than {{min}}.',
        'input-max-as-number': 'Input should be lower than the largest accepted value ({{max}}).',
        'input-max-as-string': 'Input length should be shorter than {{max}}.',
        'input-equal-as-number': 'Input does not match the expected value ({{equal}}).',
        'input-equal-as-string': 'Input length should be {{equal}} characters.',
        'input-among': 'Input is not one of the accepted values: {{values}}.',
        'input-numbers-only': 'Input should only contain numbers.',
        'input-alphabets-only': 'Input should only contain alphabet letters.',
        'input-before-date': 'The selected date should be before {{date}}',
        'input-after-date': 'The selected date should be after {{date}}',
        'input-within-date': 'The selected date should be within {{date1}} and {{date2}}',
        'input-is-password': 'Password and Password Confirm do not match.',
        'input-include-lowercase-char': 'Input should contain at least 1 lowercase letter.',
        'input-include-uppercase-char': 'Input should contain at least 1 uppercase letter.',
        'input-include-number': 'Input should contain at least 1 number.',
        'input-with-special-chars-may-include': 'Input could only contain these special characters: {{chars}}',
        'input-with-special-chars-must-include': 'Input should contain at least 1 of these special characters: {{chars}}',
        'input-include-special-chars': 'Input should contain at least 1 special character.',
        'input-allow-space': 'White space is not allowed.',
        'input-email-format': 'Input does not seem to be an email address.',
        'input-url-format': 'Input does not seem to be a valid URL.',
        'input-file-max-size': 'The chosen file is too large, max {{size}}MB.',
        'input-file-accepted-formats': 'Please select file with these formats: {{formats}}.',
        'input-files-max-size': 'File `{{name}}` is too large, max {{size}}MB.',
        'input-files-accepted-formats': 'File `{{name}}` is not allowed. Please select files with these formats: {{formats}}.',
        'input-files-min-count': 'Not enough files selected, min {{count}} files.',
        'input-files-max-count': 'Too many files selected, max {{count}} files.',
        'input-one-of-fields': 'Only 1 of these fields should contain valid input, the others must be empty: {{fields}}.',
    },
};

export default enCommons;
