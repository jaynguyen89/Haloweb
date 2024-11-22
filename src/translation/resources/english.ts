import { ITranslation } from 'src/commons/interfaces';
import enCommons from 'src/translation/resources/commons/en-commons';

const english: ITranslation = {
    translation: {
        ...enCommons,
        'recaptcha-intro': 'This site is protected by reCAPTCHA, and the Google <1>Privacy Policy</1> and <3>Terms of Service</3> apply.',
        navMenu: {
            search: 'Search',
            'my-feeds': 'My Feeds',
            'my-deals': {
                nav: 'Deals',
                children: {
                    'flash-deals': 'Flash Deals',
                    'group-deals': 'Group Deals',
                    'bundle-deals': 'Bundle deals',
                    'near-by-deals': 'Near-by Deals',
                    'wholesale-deals': 'Wholesale Deals',
                },
            },
            stores: {
                nav: 'Stores',
                children: {
                    'near-by-stores': 'Near-by Stores',
                    'all-stores': 'All Stores',
                },
            },
            dashboard: {
                nav: 'Dashboard',
                children: {
                    watching: 'Watching',
                    'recent-views': 'Recent Views',
                    'bids-offers': 'Bids & Offers',
                    purchases: 'Purchases',
                },
            },
            explore: {
                nav: 'Explore',
                children: {
                    'buying-n-selling': 'Buy & Sell Features',
                    'store-features': 'Store Features',
                    'listing-features': 'Listing Features',
                    'shipping-features': 'Shipping Features',
                    'about': 'About Halo Marketplace',
                },
            },
            'blog': 'Blog',
        },
        userMenu: {
            profile: {
                nav: 'My Profile',
                children: {
                    'manage-profile': 'Manage Profile',
                    'manage-addresses': 'Manage Addresses',
                    subscriptions: 'Subscriptions',
                    'shopping-lists': 'Shopping Lists',
                },
            },
            manage: {
                nav: 'Manage',
                children: {
                    'security-privacy': 'Security & Privacy',
                    preferences: 'Preferences',
                },
            },
            logout: 'Sign Out',
        },
        footer: {
            'project-intro': 'Initialized since July 2023 by {{whom}}',
            'language-select': {
                label: 'Site Language',
                vi: 'Vietnamese',
                en: 'English',
            },
            'theme-label': 'Site theme',
        },
        'login-page': {
            title: 'Sign in',
            'login-by': 'Sign-in with:',
            'by-credentials': 'Account credentials',
            'by-otp': 'One-Time Password (OTP)',
            'email-address-label': 'Email Address',
            'area-code-label': 'Area Code',
            'phone-number-label': 'Phone Number',
            'password-label': 'Password',
            'trusted-checkbox-text': 'Trust this device',
            'forgot-password-text': 'Forgot your password? Please <1>click here</1> to reset password.',
            'register-account-text': 'Haven\'t had an account yet? Please <1>click here</1> to create a new account',
            'social-login-text': 'A quicker way, login with social networks',
            'login-response-error-400-by-email': 'The format of your email address seems to be invalid.',
            'login-response-error-400-by-phone': 'The format of your phone number seems to be invalid.',
            'login-response-error-409-credentials': 'No record matches your credentials.',
            'login-response-error-409-otp': 'The OTP you have entered is incorrect.',
            'login-response-error-410': 'Your pre-authenticated information has become invalid due to long inactivity. Please try to login again.',
            'login-response-error-422': 'Your account has not been activated. Please activate your account first.',
            'login-response-error-423': 'Your account has been locked or suspended from login. Please find more information below before reattempting login.',
        },
        'registration-page': {
            title: 'Account Registration',
            subtitle: 'Already have account? <1>Login here</1>.',
            'register-by': 'Register By:',
            'email-address-label': 'Email Address*',
            'area-code-label': 'Area Code',
            'phone-number-label': 'Phone Number*',
            'password-label': 'Password*',
            'password-confirm-label': 'Confirm Password*',
            'username-label': 'Username*',
            'given-name-label': 'Given name',
            'middle-name-label': 'Middle name',
            'family-name-label': 'Family name',
            'full-name-label': 'Is this how your Full Name looked like?',
            'gender-label': 'Gender',
            'social-registration-text': 'Register with your social network account',
            'response-error-400-invalid-data': 'Some data are invalid. Please check and correct the following fields: {{fields}}',
            'response-error-409-conflict-email-address': 'The email address has been associated to an existing account. Please use another email address to register. If you own that email address, please try the Forgot Password feature.',
            'response-error-409-conflict-phone-number': 'The phone number has been associated to an existing account. Please use another phone number to register. If you own that phone number, please try the Forgot Password feature.',
            'registration-success-by-email-address': 'Your request to register account has been successful. Please check your email address to activate your account.',
            'registration-success-by-phone-number': 'Your request to register account has been successful. Please check your phone number to activate your account.',
        },
        'forgot-password-page': {
            title: 'Forgot Password',
            'email-address-label': 'Email Address',
            'area-code-label': 'Area Code',
            'phone-number-label': 'Phone Number',
        },
        'reset-password-page': {
            'reset-password-title': 'Set new password',
            'change-password-title': 'Change password',
            'email-address-label': 'Email address',
            'phone-number-label': 'Phone number',
            'username-label': 'Username',
            'current-password-label': 'Current Password',
            'new-password-label': 'New Password',
            'new-password-confirm-label': 'Confirm New Password',
        },
        'otp-page': {
            'otp-title': 'One-Time Password',
            'tfa-title': 'Two-Factor PIN',
            'subtitle-by-email-address': 'Don\'t get your {{what}}? <1>Send it to your email address</1>.',
            'subtitle-by-phone-number': 'Don\'t get your {{what}}? <1>Send it to your phone number</1>.',
        },
        'activate-account-page': {
            title: 'Activate account',
            'email-address-label': 'Email address',
            'phone-number-label': 'Phone number',
            'username-label': 'Username',
            'secret-code-title': 'Please enter the secret code',
            'secret-code-caption-by-email-address': 'The secret code has been sent to your email address just now, please check your email address.',
            'secret-code-caption-by-phone-number': 'The secret code has been sent to your phone number just now, please check your phone number.',
            'request-to-get-secret-code-unnecessary': 'The secret code is not required. Please proceed to the step as shown on the page.',
            'request-to-get-secret-code-invalid-destination': 'Invalid destination: no account with such data existed.',
            'request-to-get-secret-code-no-pending-activation-found': 'Invalid destination: no account with such data to be activated.`',
            'request-to-get-secret-code-activation-time-elapsed': 'The time to activate your account has elapsed. Please request another activation instruction instead.',
            'request-another-activation-email-button': 'Request Another Activation Instruction',
            'activate-account-response-error-400': 'The secret code is missing while it is required to activate your account.',
            'activate-account-response-error-403': 'Your request to activate account was failed due to mismatched secret code.',
            'activate-account-response-error-409': 'Your request to activate account was failed due to mismatched activation token.',
            'activate-account-response-error-410-by-activation-token': 'Your request to activate account was failed due to expired activation token. Please request another email to activate your account.',
            'activate-account-response-error-410-by-secret-code': 'Your request to activate account was failed due to expired secret code. Please reload page to restart the activation process.',
            'activate-account-success': 'Congratulations! You\'ve successfully activated your account. Now you can login and start shopping!',
        },
    },
};

export default english;
