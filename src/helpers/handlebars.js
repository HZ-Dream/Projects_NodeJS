const Handlebars = require('handlebars'); 
module.exports = {
    sum: (a, b) => a + b,
    formatDate: (date) => date.toLocaleDateString('vi-VN'),
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fas fa-sort',
            asc: 'fas fa-sort-up',
            desc: 'fas fa-sort-down',
        }

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        }

        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const output = `
            <a href="${href}">
                <i class="${icon}"></i>
            </a>
        `;

        return new Handlebars.SafeString(output);
    }
}