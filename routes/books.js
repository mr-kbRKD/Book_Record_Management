const express = require('express');

const { books } = require("../Data/books.json");
const { users } = require("../Data/users.json");
const {
    getAllBooks,
    getSingleBookByID,
    getAllIssuedBooks,
    addNewBook,
    updateBookByID,
    getBookByName,
} = require("../controllers/book-controller")

const router = express.Router();



/**
 * Route : /books
 * Method : GET
 * Description : Get all books
 * Access : Public(for now)
 * Parameters : None
 */

router.get('/',getAllBooks);



/**
 * Route : /books/:id
 * Method : GET
 * Description : Get books by id
 * Access : Public(for now)
 * Parameters : id
 */

router.get('/:id', getSingleBookByID);

// added new route while shifting on DB
router.get('/getbook/name/:name', getBookByName);

// bit advanced : because need to check for user and books both(the user who issued book)
/**
 * Route : /books/issued/books
 * Method : GET
 * Description : Get all issued books
 * Access : Public(for now)
 * Parameters : None
 */


router.get('/issued/books', getAllIssuedBooks);


/**
 * Route : /books
 * Method : POST
 * Description : Create a new book
 * Access : Public(for now)
 * Parameters : None
//  * this order of sequence i think doesn't matter because key value pair data come and placed on that same place,
* Data : author, name, genere, price, publisher, id
*/

router.post('/', addNewBook);
    
    /**
     * Route : /books/:id
     * Method : PUT
     * Description : Update book
     * Access : Public(for now)
     * Parameters : None
     * Data : author, name, genere, price, publisher, id
    */

    router.put('/:id', updateBookByID);


    







// default exports
module.exports = router;

