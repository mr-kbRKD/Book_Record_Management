const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    genre : {
        type : String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    publisher : {
        type : String, 
        required : true,
    },
},{
    timestamps : true,
} 
);
//                        name of model, actual schema created
// collection will have a name books( even we write singular but automatically converted bcz more than one item and in small letters)
module.exports = mongoose.model("Book", bookSchema);