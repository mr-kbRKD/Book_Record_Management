const express = require('express');

const { users } = require("../Data/users.json");

const router = express.Router();

/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public(for now)
 * Parameters : None
 */

router.get('/', (req,res)=>{
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

router.get('/:id', (req, res)=>{
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

router.post('/', (req,res)=>{
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
router.put('/:id', (req,res)=>{
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
        data : updatedUser
    });
});
/**
 * Route : /users/:id
 * Method : DELETE
 * Description : Delete a user by id
 * Access : Public(for now)
 * Parameters : id
 */

router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    const user = users.find((each) =>
        each.id === id
        );
        if(!user){
            return res.status(404).json({
                success : false,
            messgae : "User not found for given id"
        });
    }
    
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({
        success : true,
        data : users,
    });

    
})


// complex route 

/**
 * Route : /users/subscription-details/:id
 * Method : GET
 * Description : Get all user subscription details
 * Access : Public(for now)
 * Parameters : id
 */

router.get('/subscription-details/:id', (req, res)=>{
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user) return res.status(404).json({
        success : false,
        message : "User not found"
    });

    const getDateInDays = (data = "") =>{
        let date;
        if(data === ""){
            // current date
            date = new Date();
        }
        else{
            // getting date on the basis of data variable
            date = new Date(date);
        }

        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days; 

    };

    const subscriptionType = (date) =>{
        if(user.subscriptionType === 'Basic'){
            date += 90;
        }
        else if(user.subscriptionType === 'Standard'){
            date += 180;
        }
        else if(user.subscriptionType === 'Premium'){
            date += 365;
        }
        return date;
    }; 


    // subscription expiration calculations
    // january 1, 1970, UTC. (Whatever date we will get will start from this) //milliseonds 
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    console.log(returnDate); 
    const data = {
        ...user,
        subscriptionExpired : subscriptionExpiration < currentDate, 
        daysLeftForExpiration : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine : returnDate < currentDate ? 
        subscriptionExpiration <= currentDate ?
        200 :
        100
        : 0,
    };

    return res.status(200).json({
        success : true,
        data, 
    });
});






// default exports  
module.exports = router;
