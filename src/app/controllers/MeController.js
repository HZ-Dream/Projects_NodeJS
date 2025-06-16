const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next){
        try {
            let query = Course.find({}).sortable(req);

            const courses = await query.lean();

            const deletedCount = await Course.countDocumentsWithDeleted({ deleted: true });

            res.render('me/stored-courses', { courses, deletedCount });
        } catch (err) {
            next(err);
        }
    }
    
    // [GET] /me/trash/courses
    async trashCourses(req, res, next){
        try {
            const courses = await Course.findWithDeleted({deleted: true}).lean();
            res.render('me/trash-courses', { courses });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new MeController();
