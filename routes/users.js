const express = require('express');

const { users } = require("../Data/users.json");
const {UserModal, BookModal} = require('../modals');
const { getAllUsers, singleUserById, deleteUser, updateUserById, createNewUser, getSubscriptionDetailsById } = require('../controllers/user-controller');

const router = express.Router();

/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public(for now)
 * Parameters : None
 */

router.get('/', getAllUsers);

/**
 * Route : /users/:id
 * Method : GET
 * Description : Get a single by user
 * Access : Public(for now)
 * Parameters : id
 */

router.get('/:id', singleUserById);


/**
 * Route : /users
 * Method : POST
 * Description : Create a new user
 * Access : Public(for now)
 * Parameters : none
 */

router.post('/', createNewUser)

 
/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating a user data
 * Access : Public(for now)
 * Parameters : id
 */

// not perfect data validation or other things required to avoid unnecessary changes
router.put('/:id', updateUserById);
/**
 * Route : /users/:id
 * Method : DELETE
 * Description : Delete a user by id
 * Access : Public(for now)
 * Parameters : id
 */

router.delete('/:id', deleteUser)


// complex route 

/**
 * Route : /users/subscription-details/:id
 * Method : GET
 * Description : Get all user subscription details
 * Access : Public(for now)
 * Parameters : id
 */

router.get('/subscription-details/:id', getSubscriptionDetailsById);






// default exports  
module.exports = router;
