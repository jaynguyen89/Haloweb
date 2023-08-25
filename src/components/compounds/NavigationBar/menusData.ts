import { IMenuItem } from 'src/commons/interfaces';

export const navMenuItems: Array<IMenuItem> = [
    {
        title: 'navMenu.my-feeds',
        endpoint: '/feeds',
    },
    {
        title: 'navMenu.subscriptions',
        endpoint: '/subscriptions',
    },
    {
        title: 'navMenu.my-deals.nav',
        children: [
            {
                title: 'navMenu.my-deals.children.flash-deals',
                endpoint: '/flash-deals',
            },
            {
                title: 'navMenu.my-deals.children.group-deals',
                endpoint: '/group-deals',
            },
            {
                title: 'navMenu.my-deals.children.bundle-deals',
                endpoint: '/bundle-deals',
            },
            {
                title: 'navMenu.my-deals.children.near-by-deals',
                endpoint: '/nearby-deals',
            },
            {
                title: 'navMenu.my-deals.children.wholesale-deals',
                endpoint: '/wholesale-deals',
            },
        ],
    },
    {
        title: 'navMenu.stores.nav',
        children: [
            {
                title: 'navMenu.stores.children.near-by-stores',
                endpoint: '/nearby-stores',
            },
            {
                title: 'navMenu.stores.children.all-stores',
                endpoint: '/stores',
            },
        ],
    },
    {
        title: 'navMenu.dashboard.nav',
        children: [
            {
                title: 'navMenu.dashboard.children.watching',
                endpoint: '/watching',
            },
            {
                title: 'navMenu.dashboard.children.recent-views',
                endpoint: '/recent-views',
            },
            {
                title: 'navMenu.dashboard.children.bids-offers',
                endpoint: '/bids-n-offers',
            },
            {
                title: 'navMenu.dashboard.children.purchases',
                endpoint: '/purchases',
            },
        ],
    },
    {
        title: 'navMenu.manage',
        endpoint: '/manage-dashboard',
    },
];

export const userMenuItems: Array<IMenuItem> = [
    {
        title: 'userMenu.profile.nav',
        children: [
            {
                title: 'userMenu.profile.children.manage-profile',
                endpoint: '/profile',
            },
            {
                title: 'userMenu.profile.children.manage-addresses',
                endpoint: '/addresses',
            },
            {
                title: 'userMenu.profile.children.interests-hobbies',
                endpoint: '/interests-n-hobbies',
            },
            {
                title: 'userMenu.profile.children.shopping-lists',
                endpoint: '/shopping-lists',
            },
        ],
    },
    {
        title: 'userMenu.security-privacy',
        endpoint: '/security-n-privacy',
    },
    {
        title: 'userMenu.preferences',
        endpoint: '/preferences',
    },
    {
        title: 'userMenu.logout',
        endpoint: '/',
        separator: true,
    },
];
