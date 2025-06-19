const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const authRouter = require('./auth');
const meRouter = require('./me');

const checkLogin = require('../app/midddlewares/checkLoginMiddleware');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/news', newsRouter);

    app.use('/courses', checkLogin() ,coursesRouter);
    app.use('/me', checkLogin() ,meRouter);

    app.use('/', siteRouter);
}

module.exports = route;
