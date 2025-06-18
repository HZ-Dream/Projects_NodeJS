const path = require('path');
const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const port = 3000;

const route = require('./routes');

const sortMiddleware = require('./app/midddlewares/sortMiddleware');

const db = require('./config/db');

// Connect to database
db.connect();

app.use(session({
  secret: 'login1209',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middleware
app.use(sortMiddleware);

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Sesssion User
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
