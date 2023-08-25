import { ITranslation } from 'src/commons/interfaces';
import enCommons from 'src/translation/resources/commons/en-commons';

const english: ITranslation = {
    translation: {
        ...enCommons,
        navMenu: {
            'my-feeds': 'My Feeds',
            subscriptions: 'Subscriptions',
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
            manage: 'Manage',
        },
        userMenu: {
            profile: {
                nav: 'My Profile',
                children: {
                    'manage-profile': 'Manage Profile',
                    'manage-addresses': 'Manage Addresses',
                    'interests-hobbies': 'Interests & Hobbies',
                    'shopping-lists': 'Shopping Lists',
                },
            },
            'security-privacy': 'Security & Privacy',
            preferences: 'Preferences',
            logout: 'Sign Out',
        },
    },
};

export default english;
