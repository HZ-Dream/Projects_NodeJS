const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const authRouter = require('./auth');
const meRouter = require('./me');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
