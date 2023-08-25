import { ITranslation } from 'src/commons/interfaces';
import viCommons from 'src/translation/resources/commons/vi-commons';

const vietnamese: ITranslation = {
    translation: {
        ...viCommons,
        navMenu: {
            'my-feeds': 'Tin Nổi Bật',
            subscriptions: 'Theo Dõi',
            'my-deals': {
                nav: 'Deals',
                children: {
                    'flash-deals': 'Deals Nhanh',
                    'group-deals': 'Deals Theo Nhóm',
                    'bundle-deals': 'Deals Theo Gói',
                    'near-by-deals': 'Deals Khu Vực',
                    'wholesale-deals': 'Deals Giá Sỉ',
                },
            },
            stores: {
                nav: 'Cửa Hàng',
                children: {
                    'near-by-stores': 'Cửa Hàng Gần Đây',
                    'all-stores': 'Tất cả Cửa Hàng',
                },
            },
            dashboard: {
                nav: 'Cá Nhân',
                children: {
                    watching: 'Đang Theo Dõi',
                    'recent-views': 'Sản Phẩm Vừa Xem',
                    'bids-offers': 'Sản Phẩm Đang Thương Lượng',
                    purchases: 'Đơn Hàng Đã Mua',
                },
            },
            manage: 'Quản Lý',
        },
        userMenu: {
            profile: {
                nav: 'Cá Nhân',
                children: {
                    'view-profile': 'Xem Trang Cá Nhân',
                    'manage-addresses': 'Quản Lý Địa Chỉ',
                    'interests-hobbies': 'Quan Tâm & Sở Thích',
                    'shopping-lists': 'Danh Sách Mua Sắm',
                },
            },
            'security-privacy': 'Bảo Mật & Riêng Tư',
            preferences: 'Tuỳ Chỉnh Chung',
            logout: 'Đăng Xuất',
        },
    },
};

export default vietnamese;
