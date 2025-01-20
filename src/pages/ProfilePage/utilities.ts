import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons/faCheckDouble';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons/faFingerprint';
import { faIdCard } from '@fortawesome/free-solid-svg-icons/faIdCard';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';
import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons/faShieldHalved';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons/faUserAstronaut';
import { TVerticalDrawerMenu } from 'src/components/compounds/VerticalDrawer/utilities';

export enum ProfileContents {
    ProfileDetails = 'profile-details',
    InterestsHobbies = 'interests-hobbies',
    AddressBook = 'address-book',
    PaymentMethods = 'payment-methods',
    LoginCredentials = 'login-credentials',
    TwoFactor = 'two-factors',
    SecurityQuestions = 'security-questions',
    TrustedDevices = 'trusted-devices',
    VisibilitySettings = 'visibility-settings',
    Preferences = 'preferences',
}

export const profileMenu: Array<TVerticalDrawerMenu> = [
    {
        title: 'Profile & settings',
        items: [
            {
                text: 'Profile details',
                icon: faIdCard,
                link: `#${ProfileContents.ProfileDetails}`,
            },
            {
                text: 'Interests & Hobbies',
                icon: faUserAstronaut,
                link: `#${ProfileContents.InterestsHobbies}`,
            },
            {
                text: 'Address book',
                icon: faAddressBook,
                link: `#${ProfileContents.AddressBook}`,
            },
            {
                text: 'Payment methods',
                icon: faCreditCard,
                link: `#${ProfileContents.PaymentMethods}`,
            },
        ],
    },
    {
        title: 'Account & security',
        items: [
            {
                text: 'Login credentials',
                icon: faFingerprint,
                link: `#${ProfileContents.LoginCredentials}`,
            },
            {
                text: 'Two-factor auth.',
                icon: faShieldHalved,
                link: `#${ProfileContents.TwoFactor}`,
            },
            {
                text: 'Security questions',
                icon: faCheckDouble,
                link: `#${ProfileContents.SecurityQuestions}`,
            },
            {
                text: 'Trusted devices',
                icon: faLaptop,
                link: `#${ProfileContents.TrustedDevices}`,
            },
        ],
    },
    {
        title: 'Privacy & trust',
        items: [
            {
                text: 'Visibility settings',
                icon: faEye,
                link: `#${ProfileContents.VisibilitySettings}`,
            },
            {
                text: 'Preferences',
                icon: faListCheck,
                link: `#${ProfileContents.Preferences}`,
            },
        ],
    },
];
