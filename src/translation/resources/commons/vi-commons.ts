import { TTranslationMap } from 'src/commons/types';

const viCommons: TTranslationMap = {
    buttons: {
        save: 'Lưu',
        submit: 'Gửi',
        done: 'Xong!',
        cancel: 'Huỷ',
        update: 'Cập Nhật',
        delete: 'Xoá',
        remove: 'Loại Bỏ',
        add: 'Thêm Vào',
        change: 'Thay Đổi',
        'view-details': 'Chi Tiết',
    },
    labels: {
        loading: 'Đang tải...',
        'please-wait': 'Vui lòng chờ...',
        'or': 'Hoặc',
        'and': 'Và',
    },
    messages: {
        'submit-disallowed-message': 'Dữ liệu không hợp lệ, không thể gửi yêu cầu. Vui lòng kiểm tra lại dữ liệu.',
        'error-network': 'Vui lòng kiểm tra kết nối mạng internet hoặc  thiết lập proxy.',
        'error-500': '(500) - Đã có lỗi xảy ra khi chúng tôi thực hiện yêu cầu của bạn. Vui lòng thử lại nhé!',
        'error-501': '(501) - Tính năng không được hỗ trợ.',
        'input-is-nan': 'Dữ liệu không phải là số, vui lòng nhập số.',
        'input-min-as-number': 'Dữ liệu cần phải lớn hơn giá trị sàn ({{min}}).',
        'input-min-as-string': 'Dữ liệu cần phải dài hơn {{min}} ký tự.',
        'input-max-as-number': 'Dữ liệu cần phải thấp hơn giá trị trần ({{max}}).',
        'input-max-as-string': 'Dữ liệu cần phải ngắn hơn {{max}} ký tự.',
        'input-equal-as-number': 'Dữ liệu không trùng khớp với giá trị mong muốn ({{equal}}).',
        'input-equal-as-string': 'Dữ liệu cần phải có {{equal}} ký tự.',
        'input-among': 'Dữ liệu không nằm trong các giá trị được kỳ vọng: {{values}}.',
        'input-numbers-only': 'Dữ liệu cần có dạng 1 dãy số.',
        'input-alphabets-only': 'Dữ liệu không được chứa các chữ số.',
        'input-alphanumeric': 'Dữ liệu chỉ được chứa các ký tự số và chữ cái.',
        'input-pattern': 'Dữ liệu chỉ được chứa các ký tự đặc biệt sau đây: {{chars}}',
        'input-before-date': 'Vui lòng chọn ngày trước {{date}}',
        'input-after-date': 'Vui lòng chọn ngày sau {{date}}',
        'input-between-dates': 'Vui lòng chọn ngày giữa {{afterDate}} và {{beforeDate}}',
        'input-among-dates': 'Vui lòng chojn 1 trong các ngày sau: {{dates}}',
        'input-is-password': 'Mật khẩu không trùng khớp với Mật khẩu xác nhận.',
        'input-lowercase-char-required': 'Dữ liệu cần chứa ít nhất 1 ký tự in thường.',
        'input-lowercase-char-disallowed': 'Dữ liệu không được chứa ký tự in thường.',
        'input-uppercase-char-required': 'Dữ liệu cần chứa ít nhất 1 ký tự in hoa.',
        'input-uppercase-char-disallowed': 'Dữ liệu không được chứa ký tự in hoa.',
        'input-number-required': 'Dữ liệu cần chứa ít nhất 1 chữ số.',
        'input-number-disallowed': 'Dữ liệu không được chứa chữ số.',
        'input-with-special-chars-may-include': 'Dữ liệu chỉ có thể chứa các ký tự đặc biệt sau: {{chars}}',
        'input-with-special-chars-must-include': 'Dữ liệu cần có ít nhất 1 ký tự đặc biệt.',
        'input-with-required-special-chars-must-include': 'Dữ liệu cần có ít nhất 1 trong các ký tự đặc biệt sau: {{chars}}',
        'input-special-chars-disallowed': 'Dữ liệu không được chứa ký tự đặc biệt.',
        'input-space-required': 'Dữ liệu cần được chứa khoảng trắng.',
        'input-space-disallowed': 'Dữ liệu không được có khoảng trắng.',
        'input-email-format': 'Dữ liệu không phải là 1 địa chỉ email.',
        'input-url-format': 'Dữ liệu không phải là 1 URL hợp lệ.',
        'input-file-max-size': 'Dung lượng tệp quá lớn, max {{size}}MB.',
        'input-file-accepted-formats': 'Vui lòng chọn tệp với các định dạng sau: {{formats}}.',
        'input-files-max-size': 'Dung lượng tệp `{{name}}` quá lớn, max {{size}}MB.',
        'input-files-accepted-formats': 'Tệp `{{name}}` không hợp lệ. Các định dạng hợp lệ: {{formats}}.',
        'input-files-min-count': 'Quá ít tệp được chọn, ít nhất {{count}} tệp.',
        'input-files-max-count': 'Quá nhiều tệp được chọn, nhiều nhất {{count}} tệp.',
        'input-one-of-fields': 'Chỉ 1 trong các mục sau đây cần được nhập dữ liệu hợp lệ, các mục còn lại để trống: {{fields}}',
        'recaptcha-not-clicked': 'Recaptcha: vui lòng nhấp vào ô kiểm Recaptcha.',
        'recaptcha-token-missing': 'Recaptcha chưa thể xác minh bạn là con người. Vui lòng tải lại trang.',
        'authentication-success': 'Bạn đã đăng nhập thành công!',
    },
};

export default viCommons;
