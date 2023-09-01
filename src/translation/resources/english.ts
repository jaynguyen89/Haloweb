import { ITranslation } from 'src/commons/interfaces';
import enCommons from 'src/translation/resources/commons/en-commons';

const english: ITranslation = {
    translation: {
        ...enCommons,
        'recaptcha-intro': 'This site is protected by reCAPTCHA, and the Google <1>Privacy Policy</1> and <3>Terms of Service</3> apply.',
        navMenu: {
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
        },
        'login-page': {
            title: 'Sign in',
            'email-address-label': 'Email Address',
            'area-code-label': 'Area Code',
            'phone-number-label': 'Phone Number',
            'password-label': 'Password',
            'trusted-checkbox-text': 'Trust this device',
            'forgot-password-text': 'Forgot your password? Please <1>click here</1> to reset password.',
            'register-account-text': 'Haven\'t had an account yet? Please <1>click here</1> to create a new account',
            'social-login-text': 'A quicker way, login with social networks',
        },
        'registration-page': {
            title: 'Account Registration',
            subtitle: 'Already have account? <1>Login here</1>.',
            'email-address-label': 'Email Address',
            'area-code-label': 'Area Code',
            'phone-number-label': 'Phone Number',
            'password-label': 'Password',
            'password-confirm-label': 'Confirm Password',
            'username-label': 'Username',
            'given-name-label': 'Given name',
            'middle-name-label': 'Middle name',
            'family-name-label': 'Family name',
            'full-name-label': 'Is this how your Full Name looked like?',
            'gender-label': 'Gender',
        },
        'forgot-password-page': {
            title: 'Forgot Password',
            'email-address-label': 'Email Address',
            'area-code-label': 'Area Code',
            'phone-number-label': 'Phone Number',
        },
    },
};

export default english;
