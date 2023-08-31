import { IMenuItem } from 'src/commons/interfaces';

export const guestNavMenuItems: Array<IMenuItem> = [
    {
        title: 'navMenu.my-deals.nav',
        children: [
            {
                title: 'navMenu.my-deals.children.flash-deals',
                endpoint: '/flash-deals',
                icon: 'bolt',
            },
            {
                title: 'navMenu.my-deals.children.group-deals',
                endpoint: '/group-deals',
                icon: 'people-group',
            },
            {
                title: 'navMenu.my-deals.children.bundle-deals',
                endpoint: '/bundle-deals',
                icon: 'gifts',
            },
            {
                title: 'navMenu.my-deals.children.near-by-deals',
                endpoint: '/nearby-deals',
                icon: 'location-dot',
            },
            {
                title: 'navMenu.my-deals.children.wholesale-deals',
                endpoint: '/wholesale-deals',
                icon: 'cubes',
            },
        ],
    },
    {
        title: 'navMenu.stores.nav',
        children: [
            {
                title: 'navMenu.stores.children.near-by-stores',
                endpoint: '/nearby-stores',
                icon: 'shop',
            },
            {
                title: 'navMenu.stores.children.all-stores',
                endpoint: '/stores',
                icon: 'store',
            },
        ],
    },
    {
        title: 'navMenu.explore.nav',
        children: [
            {
                title: 'navMenu.explore.children.buying-n-selling',
                endpoint: '/buy-n-sell-features',
                icon: 'receipt',
            },
            {
                title: 'navMenu.explore.children.store-features',
                endpoint: '/store-features',
                icon: 'shop',
            },
            {
                title: 'navMenu.explore.children.listing-features',
                endpoint: '/listing-features',
                icon: 'tags',
            },
            {
                title: 'navMenu.explore.children.shipping-features',
                endpoint: '/shipping-features',
                icon: 'truck-fast',
            },
            {
                title: 'navMenu.explore.children.about',
                endpoint: '/about-halo',
                icon: 'sun',
            },
        ],
    },
    {
        title: 'navMenu.blog',
        endpoint: '/blog',
    },
];

export const authNavMenuItems: Array<IMenuItem> = [
    {
        title: 'navMenu.my-feeds',
        endpoint: '/feeds',
    },
    {
        title: 'navMenu.my-deals.nav',
        children: [
            {
                title: 'navMenu.my-deals.children.flash-deals',
                endpoint: '/flash-deals',
                icon: 'bolt',
            },
            {
                title: 'navMenu.my-deals.children.group-deals',
                endpoint: '/group-deals',
                icon: 'people-group',
            },
            {
                title: 'navMenu.my-deals.children.bundle-deals',
                endpoint: '/bundle-deals',
                icon: 'gifts',
            },
            {
                title: 'navMenu.my-deals.children.near-by-deals',
                endpoint: '/nearby-deals',
                icon: 'location-dot',
            },
            {
                title: 'navMenu.my-deals.children.wholesale-deals',
                endpoint: '/wholesale-deals',
                icon: 'cubes',
            },
        ],
    },
    {
        title: 'navMenu.stores.nav',
        children: [
            {
                title: 'navMenu.stores.children.near-by-stores',
                endpoint: '/nearby-stores',
                icon: 'shop',
            },
            {
                title: 'navMenu.stores.children.all-stores',
                endpoint: '/stores',
                icon: 'store',
            },
        ],
    },
    {
        title: 'navMenu.dashboard.nav',
        children: [
            {
                title: 'navMenu.dashboard.children.watching',
                endpoint: '/watching',
                icon: 'eye',
            },
            {
                title: 'navMenu.dashboard.children.recent-views',
                endpoint: '/recent-views',
                icon: 'clock-rotate-left',
            },
            {
                title: 'navMenu.dashboard.children.bids-offers',
                endpoint: '/bids-n-offers',
                icon: 'hand-holding-dollar',
            },
            {
                title: 'navMenu.dashboard.children.purchases',
                endpoint: '/purchases',
                icon: 'cart-shopping',
            },
        ],
    },
];

export const userMenuItems: Array<IMenuItem> = [
    {
        title: 'userMenu.profile.nav',
        icon: 'user',
        children: [
            {
                title: 'userMenu.profile.children.manage-profile',
                endpoint: '/profile',
                icon: 'id-badge',
            },
            {
                title: 'userMenu.profile.children.manage-addresses',
                endpoint: '/addresses',
                icon: 'map-location-dot',
            },
            {
                title: 'userMenu.profile.children.subscriptions',
                endpoint: '/subscriptions',
                icon: 'user-astronaut',
            },
            {
                title: 'userMenu.profile.children.shopping-lists',
                endpoint: '/shopping-lists',
                icon: 'clipboard-list',
            },
        ],
    },
    {
        title: 'userMenu.manage.nav',
        icon: 'gear',
        children: [
            {
                title: 'userMenu.manage.children.security-privacy',
                icon: 'shield-halved',
                endpoint: '/security-n-privacy',
            },
            {
                title: 'userMenu.manage.children.preferences',
                icon: 'wrench',
                endpoint: '/preferences',
            },
        ],
    },
    {
        title: 'userMenu.logout',
        icon: 'right-from-bracket',
        endpoint: '/',
        separator: true,
    },
];
