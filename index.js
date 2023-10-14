const express = require('express');
// JSON data import

// importing routes
const userRouter = require("./routes/users");
const booksRouter = require("./routes/books"); 

const app = express();
const PORT = 3001;

app.use(express.json()); 

// to check by just url in chrome that server is running or not instead of making any request
app.get('/', (req, res)=>{
    res.status(200).json({
        message : "Server is up and running",
    });
});

// smart nodejs and express already checked for all
app.use('/users', userRouter);
// app.use("/users", userRouter);
app.use('/books', booksRouter);


app.all('*', (req, res)=>{
    res.status(404).json({
        message : "This route/endpoint doesn't exist",
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});