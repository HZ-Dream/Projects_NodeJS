const Course = require('../models/Course');
const getPageToShow = require('../code-refactoring/pageToShow.js');

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next){
        try {
            const page = parseInt(req.query._page) || 1;

            if (!req.query._page) {
                const query = { ...req.query, _page: 1 };
                const searchParams = new URLSearchParams(query).toString();
                return res.redirect(`${req.baseUrl}${req.path}?${searchParams}`);
            }

            const limit = 3;
            const totalDocuments = await Course.countDocuments({});
            const totalPages = Math.ceil(totalDocuments / limit);
            
            let query = Course.find({ createdBy: req.session.user._id }).sortable(req);

            const courses = await query
                .skip((page - 1) * limit)
                .limit(limit)    
                .lean();

            const deletedCount = await Course.countDocumentsWithDeleted({ createdBy: req.session.user._id, deleted: true });

            let pageToShow = getPageToShow(page, totalPages);

            res.render('me/stored-courses', { 
                courses, 
                deletedCount, 
                totalPages,
                pageToShow,
                limit, 
                currentPage: page,
                _sort: req.query
            });
        } catch (err) {
            next(err);
        }
    }
    
    // [GET] /me/trash/courses
    async trashCourses(req, res, next){
        try {
            let query = Course.findWithDeleted({  createdBy: req.session.user._id, deleted: true }).sortable(req);

            const courses = await query.lean();
            res.render('me/trash-courses', { courses });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new MeController();
