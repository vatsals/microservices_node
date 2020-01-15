const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: true
    }
});

module.exports = Book = mongoose.model('Book', BookSchema);