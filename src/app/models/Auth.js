const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Shema = mongoose.Schema;

const AuthSchema = new Shema({
    _id: { type: Number, },
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    avatar: { type: String, }
}, {
    _id: false,
    timestamps: true,
});

// Add plugin
AuthSchema.plugin(AutoIncrement, { id: 'user_id_counter', inc_field: '_id' });

module.exports = mongoose.model('users', AuthSchema);
