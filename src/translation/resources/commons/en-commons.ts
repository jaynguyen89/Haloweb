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
    texts: {
        'email-address': 'email address',
        'phone-number': 'phone number',
    },
    messages: {
        'error-network': 'Network error: please check your internet connection or proxy configurations.',
        'error-500': '500 - Internal Server Error: An unknown issue has happened in our side. Please try again later.',
        'error-501': '501 - Not Implemented: The requested feature is unavailable.',
    },
};

export default enCommons;
