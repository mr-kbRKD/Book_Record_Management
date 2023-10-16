const mongoose = require('mongoose');
function DbConnection(){
    const DB_URL = process.env.MONGO_URI;


    // to make it run better we will add some settings in curly baces(by default settings) {if even not written settings then still it will work fine but have to refer docs for what purpose or i think after any update problemm  may happend that;s why}
    mongoose.connect(DB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    });

    // mongoose.connect(DB_URL);

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection error : "));
    db.once("open", function (){
        console.log("Db connected successfully...");
    });
}

module.exports = DbConnection;