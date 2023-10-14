const express = require('express');

const { books } = require("../Data/books.json");
const { users } = require("../Data/users.json");

const router = express.Router();



/**
 * Route : /books
 * Method : GET
 * Description : Get all books
 * Access : Public(for now)
 * Parameters : None
 */

router.get('/',(req, res)=>{
    res.status(200).json({
        success:true,
        data : books,
    });
});



/**
 * Route : /books/:id
 * Method : GET
 * Description : Get books by id
 * Access : Public(for now)
 * Parameters : id
 */

router.get('/:id',(req, res)=>{
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : "Book is not found"
        });
    }

    return res.status(200).json({
        success:true,
        data : book,
    });
});
 

// bit advanced : because need to check for user and books both(the user who issued book)
/**
 * Route : /books/issued
 * Method : GET
 * Description : Get all issued books
 * Access : Public(for now)
 * Parameters : None
 */


router.get('/issued/books', (req,res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    });

    // create a empty array
    const issuedBooks = [];
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book)=>book.id === each.issuedBook);

        // will add some extra fiels in books data
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length === 0)
    return res.status(404).json({
        success : false,
        message : "No book issued yet",
        });

        return res.status(200).json({
            success : true,
            data : issuedBooks,
        })
});














// default exports
module.exports = router;

