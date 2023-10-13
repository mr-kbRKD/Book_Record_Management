const express = require('express');
// JSON data import
const { users } = require("../Data/users.json");

const app = express();
const PORT = 3001;

app.use(express.json()); 

app.get('/', (req, res)=>{
    res.status(200).json({
        message : "Server is up and running",
    });
});

/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public(for now)
 * Parameters : None
 */

app.get('/users', (req,res)=>{
    res.status(200).json({
        success : true,
        data : users
    });
});

/**
 * Route : /users/:id
 * Method : GET
 * Description : Get a single by user
 * Access : Public(for now)
 * Parameters : id
 */

app.get('/users/:id', (req, res)=>{
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User not found",
        });
    }

    return res.status(200).json({
        success : true,
        data : user,
    });
});


/**
 * Route : /users
 * Method : POST
 * Description : Create a new user
 * Access : Public(for now)
 * Parameters : none
 */

app.post('/users', (req,res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each)=> each.id === id);
    if(user){
        return res.status(404).json({
            success : false,
            message : "User already exist with this id"
        });
    }

    users.push({
        // id : id, [this line is similar with below line because value of both variable are same]
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success : true,
        data : users,
    })

})

 
/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating a user data
 * Access : Public(for now)
 * Parameters : id
 */

// not perfect data validation or other things required to avoid unnecessary changes
app.put('/users/:id', (req,res)=>{
    const { id } = req.params;
    // will take data as variable or send as JSON object from frontend(postman)
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if(!user) return res.status(404).json({
        success : false,
        message : "User not found"
    });

    const updatedUser = users.map((each) =>{
        if(each.id === id){
            return{
                ...each,
                ...data
            }
        }
        return each;
    });

    return res.status(200).json({
        success : true,
        data : updatedUser,
    });
})





app.all('*', (req, res)=>{
    res.status(404).json({
        message : "This route/endpoint doesn't exist",
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});