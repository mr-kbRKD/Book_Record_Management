const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    surname : {
        type : String,
        required : false,
    },
    email : {
        type : String,
        required : true,
    },
    issuedBook : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Book",
        required : false,
    },
    issuedDate : {
        type : String,
        required : false,
    },
    returnDate : {
        type : String, 
        required : false,
    },
     subscriptionType : {
        type : String, 
        required : true,
    },
     subscriptionDate : {
        type : String, 
        required : true,
    },
},{
    timestamps : true,
} 
);
//                        name of model, actual schema created
// collection will have a name users( even we write singular but automatically converted bcz more than one item and in small letters)
module.exports = mongoose.model("User", userSchema);