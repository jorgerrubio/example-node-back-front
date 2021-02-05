const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    photo: { type: String },
    updated_at: { type: Date, default: null }
});

module.exports = model('User', UserSchema);