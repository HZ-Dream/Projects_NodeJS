const express = require('express');
const router = express.Router();
const upload = require('../app/midddlewares/imageMiddleware');
const AuthController = require('../app/controllers/AuthController');

router.get('/sign-in', AuthController.signin);
router.post('/sign-in/access', AuthController.access);

router.get('/sign-up', AuthController.signUp);
router.post('/sign-up/store', upload.single('signup_avatar'), AuthController.store);

router.post('/logout', AuthController.logout)

module.exports = router;