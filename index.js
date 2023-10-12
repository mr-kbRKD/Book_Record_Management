const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json()); 

app.get('/', (req, res)=>{
    res.status(200).json({
        message : "Server is up and running",
    });
});
app.all('*', (req, res)=>{
    res.status(404).json({
        message : "This route/endpoint doesn't exist",
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});