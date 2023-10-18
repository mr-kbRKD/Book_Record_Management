const {UserModal, BookModal} = require('../modals');
const userModel = require('../modals/user-model');


exports.getAllUsers = async (req,res)=>{

    const users = await userModel.find();
    if(userModel.length === 0){
        return res.status(404).json({
            success : false,
            message : "User not found",
        });
    }

    res.status(200).json({
        success : true,
        data : users
    });
};

exports.singleUserById = async (req, res)=>{
    const { id } = req.params;
    // const user = await UserModal.findbyId(id);
    // other option just to show
    const user = await UserModal.findById({ _id : id});

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
};

exports.createNewUser = async (req,res)=>{  
    // new way is
    const { data } = req.body;
    const newUser = await userModel.create(data);

    return res.status(201).json({
        success : true,
        data : newUser,
    });

};

exports.updateUserById = async (req,res)=>{
    const { id } = req.params;
    // will take data as variable or send as JSON object from frontend(postman)
    const { data } = req.body;
    // this way of updation is much more preferred than we do in book controller
    const updatedUserData = await userModel.findOneAndUpdate({
        _id : id
    }, {
        // it will check only for fields needs to be updated and if new one then also set them in DB 
        $set : {
            ...data,
        },
    },
    {
        new : true,
    }
    );

    
    return res.status(200).json({
        success : true,
        data : updatedUserData
    });
};

exports.deleteUser = async (req, res)=>{
    const { id } = req.params;
    // lets try will it work or not (IDK why deleteone is not working with this : bcz of syntax now its fine and findAndDeleteOne will delete like in queue only 1 or firts value inserted in data)
    const user = await userModel.deleteOne({
        _id: id,
      });;  // deleteone will delete only one item at a time, if multiple exists. deleteMultiple will delete all 
    // otherwise
    // const user = await userModel.deleteOne({
    //     _id : id, 
    // });

        if(!user){
            return res.status(404).json({
            success : false,
            messgae : "User not found for given id"
        });
    }
    
    return res.status(202).json({
        success : true,
        // data : user,
        message : `Deleted the user ${user} successfully`,
        // msg : "successfuly deletd",
    });   
};   

exports.getSubscriptionDetailsById = async (req, res)=>{
    const {id} = req.params;
    const user = await userModel.findById(id);

    if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
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

    // console.log(returnDate); 
    const data = {
        ...user._doc,
        subscriptionExpired : subscriptionExpiration < currentDate, 
        daysLeftForExpiration : 
        subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
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
};