import { ITranslation } from 'src/commons/interfaces';
import viCommons from 'src/translation/resources/commons/vi-commons';

const vietnamese: ITranslation = {
    translation: {
        ...viCommons,
        'recaptcha-intro': 'Trang này được bảo vệ bởi reCAPTCHA, các <1>Chính sách riêng tư</1> và <3>Điều khoản dịch vụ</3> của Google được áp dụng.',
        navMenu: {
            search: 'Tìm Kiếm',
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
            'social-registration-text': 'Đăng ký với tài khoản mạng xã hội',
            'submit-disallowed-message': 'Dữ liệu không hợp lệ, không thể gửi yêu cầu. Vui lòng kiểm tra lại dữ liệu.',
            'server-error-400-invalid-data': 'Một số dữ liệu không hợp lệ. Vui lòng kiểm tra lại các mục sau: {{fields}}',
            'response-error-409-conflict-email-address': 'Địa chỉ email đã được đăng ký tài khoản Halogen. Vui lòng sử dụng email khác. Nếu bạn quên mật khẩu, hãy thử khôi phục mật khẩu.',
            'response-error-409-conflict-phone-number': 'Số điện thoại đã được đăng ký tài khoản Halogen. Vui lòng sử dụng số khác. Nếu bạn quên mật khẩu, hãy thử khôi phục mật khẩu.',
            'registration-success-by-email-address': 'Yêu cầu tạo tài khoản của bạn đã thành công! Vui lòng kiểm tra địa chỉ email để kích hoạt tài khoản.',
            'registration-success-by-phone-number': 'Yêu cầu tạo tài khoản của bạn đã thành công! Vui lòng kiểm tra số điện thoại để kích hoạt tài khoản.',
        },
        'forgot-password-page': {
            title: 'Quên mật khẩu',
            'email-address-label': 'Địa chỉ email',
            'area-code-label': 'Mã vùng',
            'phone-number-label': 'Số điện thoại',
        },
        'reset-password-page': {
            'reset-password-title': 'Đặt lại mật khẩu',
            'change-password-title': 'Thay đổi mật khẩu',
            'email-address-label': 'Địa chỉ email',
            'phone-number-label': 'Số điện thoại',
            'username-label': 'Username',
            'current-password-label': 'Mật khẩu hiện tại',
            'new-password-label': 'Mật khẩu mới',
            'new-password-confirm-label': 'Xác nhận mật khẩu mới',
        },
        'otp-page': {
            'otp-title': 'Xác thực OTP',
            'tfa-title': 'Xác thực 2 bước (PIN)',
            'subtitle-by-email-address': 'Không nhận được {{what}} của bạn? <1>Gửi nó đến địa chỉ email</1>.',
            'subtitle-by-phone-number': 'Không nhận được {{what}} của bạn? <1>Gửi nó đến số điện thoại</1>.',
        },
        'activate-account-page': {
            title: 'Kích hoạt tài khoản',
            'email-address-label': 'Địa chỉ email',
            'phone-number-label': 'Số điện thoại',
            'username-label': 'Username',
            'secret-code-title': 'Vui lòng nhập mã bảo mật',
            'secret-code-caption-by-email-address': 'Mã bảo mật vừa được gửi đến địa chỉ email của bạn, kiểm tra địa chỉ email nhé!',
            'secret-code-caption-by-phone-number': 'Mã bảo mật vừa được gửi đến số điện thoại của bạn, kiểm tra số điện thoại nhé!',
            'request-to-get-secret-code-invalid-destination': 'Dữ liệu không hợp lệ `{{destination}}`: tài khoản trên không tồn tại.',
            'request-to-get-secret-code-no-pending-activation-found': 'Dữ liệu không hợp lệ `{{destination}}: tài khoản trên không cần kích hoạt.`',
            'request-to-get-secret-code-activation-time-elapsed': 'Mã kích hoạt tài khoản đax hết hạn. Vui lòng gửi yêu cầu để nhận mã kích hoạt mới.',
            'request-another-activation-email-button': 'Yêu Cầu Mã Kích Hoạt Mới',
            'activate-account-response-error-400': 'Yêu cầu kích hoạt tài khoản của bạn không thể được thực hiện do thiếu thông tin tài khoản.',
            'activate-account-response-error-409-by-secret-code': 'Yêu cầu kích hoạt tài khoản của bạn đã thất bại do không đúng mã bảo mật.',
            'activate-account-response-error-409-by-activation-token': 'Yêu cầu kích hoạt tài khoản của bạn đã thất bại do không đúng mã kích hoạt.',
            'activate-account-response-error-410': 'Yêu cầu kích hoạt tài khoản của bạn đã thất bại do hết thời hạn mã bảo mật. Vui lòng tải lại trang để kích hoạt lại từ đầu.',
            'activate-account-response-error-416': 'Yêu cầu kích hoạt tài khoản của bạn không thể được thực hiện do loại mã kích hoạt không đúng.',
            'activate-account-success': 'Chúc mừng! Bạn vừa kích hoạt tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ để trải nghiệm mua sắm!',
        },
    },
};

export default vietnamese;
