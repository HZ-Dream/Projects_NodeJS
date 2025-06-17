const Course = require('../models/Course');
const getPageToShow = require('../code-refactoring/pageToShow.js');

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next){
        try {
            const page = req.query._page ? parseInt(req.query._page) : 1;

            if (!req.query._page) {
                return res.redirect(`/me/stored/courses?_page=${page}`);
            }

            const limit = 3;
            const totalDocuments = await Course.countDocuments({});
            const totalPages = Math.ceil(totalDocuments / limit);
            
            let query = Course.find({}).sortable(req);

            const courses = await query
                .skip((page - 1) * limit)
                .limit(limit)    
                .lean();

            const deletedCount = await Course.countDocumentsWithDeleted({ deleted: true });

            let pageToShow = getPageToShow(page, totalPages);

            res.render('me/stored-courses', { 
                courses, 
                deletedCount, 
                totalPages,
                pageToShow,
                limit, 
                currentPage: page 
            });
        } catch (err) {
            next(err);
        }
    }
    
    // [GET] /me/trash/courses
    async trashCourses(req, res, next){
        try {
            let query = Course.findWithDeleted({ deleted: true }).sortable(req);

            const courses = await query.lean();
            res.render('me/trash-courses', { courses });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new MeController();
