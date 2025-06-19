const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    formatDate: (date) => date.toLocaleDateString('vi-VN'),
    sortable: (field, sort) => {
        // Xác định trạng thái sort hiện tại
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fas fa-sort',
            asc: 'fas fa-sort-up',
            desc: 'fas fa-sort-down',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        // Tạo object chứa các tham số
        const queryParams = { ...sort };

        // Sắp xếp tham số theo thứ tự mong muốn
        const orderedParams = [];
        
        // Thêm các tham số khác (trừ _sort, column, type, _page)
        for (const [key, value] of Object.entries(queryParams)) {
            if (!['_sort', 'column', 'type', '_page'].includes(key)) {
                orderedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }

        // Thêm _sort, column, type
        orderedParams.push('_sort=');
        orderedParams.push(`column=${encodeURIComponent(field)}`);
        orderedParams.push(`type=${encodeURIComponent(type)}`);

        // Thêm _page cuối cùng (nếu có)
        if (queryParams._page) {
            orderedParams.push(`_page=${encodeURIComponent(queryParams._page)}`);
        }

        // Tạo href
        const href = `?${orderedParams.join('&')}`;

        const output = `
            <a href="${href}">
                <i class="${icon}"></i>
            </a>
        `;

        return new Handlebars.SafeString(output);
    }
};