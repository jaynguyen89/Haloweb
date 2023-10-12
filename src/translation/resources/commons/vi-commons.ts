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
        'view-details': 'Chi Tiết',
    },
    labels: {
        loading: 'Đang tải...',
        'please-wait': 'Vui lòng chờ...',
        'or': 'Hoặc',
        'and': 'Và',
    },
    messages: {
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
        'input-before-date': 'Vui lòng chọn ngày trước {{date}}',
        'input-after-date': 'Vui lòng chọn ngày sau {{date}}',
        'input-within-date': 'Vui lòng chọn ngày nằm giữa {{date1}} và {{date2}}',
        'input-is-password': 'Mật khẩu không trùng khớp với Mật khẩu xác nhận.',
        'input-include-lowercase-char': 'Dữ liệu cần chứa ít nhất 1 ký tự thường.',
        'input-include-uppercase-char': 'Dữ liệu cần chứa ít nhất 1 ký tự in hoa.',
        'input-include-number': 'Dữ liệu cần chứa ít nhất 1 chữ số.',
        'input-with-special-chars-may-include': 'Dữ liệu chỉ có thể chứa các ký tự đặc biệt sau: {{chars}}',
        'input-with-special-chars-must-include': 'Dữ liệu cần có it1 nhất 1 trong các ký tự đặc biệt sau: {{chars}}',
        'input-include-special-chars': 'Dữ liệu cần có ít nhất 1 ký tự đặc biệt.',
        'input-allow-space': 'Dữ liệu không được chứa khoảng trắng.',
        'input-email-format': 'Dữ liệu không phải là 1 địa chỉ email.',
        'input-url-format': 'Dữ liệu không phải là 1 URL hợp lệ.',
        'input-file-max-size': 'Dung lượng tệp quá lớn, max {{size}}MB.',
        'input-file-accepted-formats': 'Vui lòng chọn tệp với các định dạng sau: {{formats}}.',
        'input-files-max-size': 'Dung lượng tệp `{{name}}` quá lớn, max {{size}}MB.',
        'input-files-accepted-formats': 'Tệp `{{name}}` không hợp lệ. Các định dạng hợp lệ: {{formats}}.',
        'input-files-min-count': 'Quá ít tệp được chọn, ít nhất {{count}} tệp.',
        'input-files-max-count': 'Quá nhiều tệp được chọn, nhiều nhất {{count}} tệp.',
        'input-one-of-fields': 'Chỉ 1 trong các mục sau đây cần được nhập dữ liệu hợp lệ, các mục còn lại để trống: {{fields}}',
    },
};

export default viCommons;
