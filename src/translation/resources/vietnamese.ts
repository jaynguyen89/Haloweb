import { ITranslation } from 'src/commons/interfaces';
import viCommons from 'src/translation/resources/commons/vi-commons';

const vietnamese: ITranslation = {
    translation: {
        ...viCommons,
        'recaptcha-intro': 'Trang này được bảo vệ bởi reCAPTCHA, các <1>Chính sách riêng tư</1> và <3>Điều khoản dịch vụ</3> của Google được áp dụng.',
        navMenu: {
            'my-feeds': 'Tin Nổi Bật',
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
            explore: {
                nav: 'Khám Phá',
                children: {
                    'buying-n-selling': 'Mua & Bán',
                    'store-features': 'Mở Cửa Hàng',
                    'listing-features': 'Đăng Bán Sản Phẩm',
                    'shipping-features': 'Chuyển Phát Hàng Hóa',
                    'about': 'Halo Marketplace',
                },
            },
            'blog': 'Blog',
        },
        userMenu: {
            profile: {
                nav: 'Cá Nhân',
                children: {
                    'view-profile': 'Xem Trang Cá Nhân',
                    'manage-addresses': 'Quản Lý Địa Chỉ',
                    subscriptions: 'Theo Dõi',
                    'shopping-lists': 'Danh Sách Mua Sắm',
                },
            },
            manage: {
                nav: 'Quản Lý',
                children: {
                    'security-privacy': 'Bảo Mật & Riêng Tư',
                    preferences: 'Tùy Chỉnh Chung',
                },
            },
            logout: 'Đăng Xuất',
        },
        footer: {
            'project-intro': 'Khởi lập từ tháng 7 2023 bởi {{whom}}',
            'language-select': {
                label: 'Ngôn Ngữ',
                vi: 'Tiếng Việt',
                en: 'Tiếng Anh',
            },
        },
        'login-page': {
            title: 'Đăng Nhập',
            'email-address-label': 'Địa chỉ email',
            'area-code-label': 'Mã vùng',
            'phone-number-label': 'Số điện thoại',
            'password-label': 'Mật khẩu',
            'trusted-checkbox-text': 'Đây là thiết bị đáng tin cậy',
            'forgot-password-text': 'Quên mật khẩu? Vui lòng <1>nhấn vào đây</1> để đặt lại mật khẩu.',
            'register-account-text': 'Chưa có tài khoản? Vui lòng <1>nhấn vào đây</1> để tạo tài khoản mới.',
            'social-login-text': 'Để nhanh chóng hơn, bạn có thể đăng nhập bằng tài khoản mạng xã hội',
        },
        'registration-page': {
            title: 'Đăng ký tài khoản',
            subtitle: 'Đã có tài khoản? <1>Đăng nhập tại đây</1>.',
            'email-address-label': 'Địa chỉ email',
            'area-code-label': 'Mã vùng',
            'phone-number-label': 'Số điện thoại',
            'password-label': 'Mật khẩu',
            'password-confirm-label': 'Xác nhận mật khẩu',
            'username-label': 'Nhập Username',
            'given-name-label': 'Tên',
            'middle-name-label': 'Tên lót',
            'family-name-label': 'Họ',
            'full-name-label': 'Đây có phải là tên đầy đủ của bạn?',
            'gender-label': 'Giới tính',
        },
        'forgot-password-page': {
            title: 'Quên mật khẩu',
            'email-address-label': 'Địa chỉ email',
            'area-code-label': 'Mã vùng',
            'phone-number-label': 'Số điện thoại',
        },
    },
};

export default vietnamese;
