const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');

const Shema = mongoose.Schema;

const CourseSchema = new Shema({
    _id: { type: Number, },
    name: { type: String, required: true, },
    slug: { type: String, slug: 'name', unique: true },
    description: { type: String,  },
    image: { type: String,  },
    videoId: { type: String, required: true, },
    level: { type: String,  },
    createdBy: { type: Number, }
}, {
    _id: false,
    timestamps: true,
});

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if ('_sort' in req.query) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        });
    }
    return this;
};

// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongoosePaginate);

CourseSchema.plugin(AutoIncrement, { id: 'course_id_counter', inc_field: '_id' });
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', CourseSchema);
