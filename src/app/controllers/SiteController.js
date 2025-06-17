const Course = require('../models/Course');

class SiteController {
    // [GET] /
    async index(req, res, next){
        try {
            const courses = await Course.find({}).lean();
            res.render('home', { courses });
        } catch (err) {
            next(err);
        }
    }   

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
