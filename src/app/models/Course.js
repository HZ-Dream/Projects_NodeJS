const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Shema = mongoose.Schema;

const CourseSchema = new Shema({
    _id: { type: Number, },
    name: { type: String, required: true, },
    slug: { type: String, slug: 'name', unique: true },
    description: { type: String,  },
    image: { type: String,  },
    videoId: { type: String, required: true, },
    level: { type: String,  },
}, {
    _id: false,
    timestamps: true,
});

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if ('_sort' in req.query) {
        const isValidTypes = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidTypes ? req.query.type : 'desc'
        });
    }
    return this;
};

// Add plugins
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', CourseSchema);
