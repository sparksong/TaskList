const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    completed: {
        type: Boolean
    },
    createDate: {
        type: Date
    }
});

module.exports = mongoose.model('Task', taskSchema);