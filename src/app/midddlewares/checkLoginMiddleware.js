const checkLogin = () => {
    return (req, res, next) => {
        if(req.session.user) {
            next();
        } else {
            res.render('needlogin');
        }
    };
};

module.exports = checkLogin;