const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');

class AuthController {
    // [GET] /auth/signin
    signin(req, res, next) {
        res.render('auth/signin', {
            layout: false
        });
    }

    // [POST] /auth/sign-in/access
    async access(req, res, next) {
        try {
            const { email, password } = req.body;

            // Find user by name
            const user = await Auth.findOne({ email });
            if (!user) {
                return res.render('auth/', {
                    layout: false,
                    error: 'User not found'
                });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.render('auth/signin', {
                        layout: false,
                        error: 'Incorrect password'
                    });
                } else {
                    req.session.user = user;
                    res.redirect('/');
                }
            }
        } catch (error) {
            next(error);
        }
    }
    
    // [GET] /auth/me/sign-up
    signUp(req, res, next) {
        res.render('auth/signup', {
            layout: false
        });
    }

    // [POST] /auth/sign-up/store
    async store(req, res, next) {
        try {
            const { signup_name, signup_email, signup_password, signup_avatar } = req.body;
    
            // Check if user already exists
            const checkEmail = await Auth.find({ email: signup_email });
                if (checkEmail.length > 0) {
                    return res.render('auth/signup', {
                        layout: false,
                        error: 'Email already exists'
                    });
                } else {
                    const hashedPassword = await bcrypt.hash(signup_password, 10);
                    const user = new Auth({
                        name: signup_name,
                        email: signup_email,
                        password: hashedPassword,
                        avatar: req.file ? req.file.filename : ""
                    });
                    await user.save();
                    res.redirect('/auth/sign-in');
                }
        } catch (error) {
            next(error);
        }
    }

    // [GET] /auth/logout
    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}

module.exports = new AuthController();
