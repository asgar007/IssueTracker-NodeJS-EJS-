const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // to create 2 more fields createdAt and UpdatedAT
});


const Project = mongoose.model('Project', userSchema);
module.exports = Project;