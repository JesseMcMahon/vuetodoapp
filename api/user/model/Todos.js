const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    currentlyEditing: {
        type: Boolean,
        required: true,
        default: false
    },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;