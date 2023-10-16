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
 * Route : /books/issued/books
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


/**
 * Route : /books
 * Method : POST
 * Description : Create a new book
 * Access : Public(for now)
 * Parameters : None
//  * this order of sequence i think doesn't matter because key value pair data come and placed on that same place,
* Data : author, name, genere, price, publisher, id
*/

router.post('/', (req, res)=>{
    const { data } = req.body;
    
    if(!data){
        return res.status(404).json({
            success : false,
            message : "No data provided for book",
            });
        }
        // .push will also work(data is new book (comes data from user(frontend))) and books is already existing books 
        const allBooks = [...books, data];
        
        const book = books.find((each)=>each.id === data.id);
        if(book){
            return res.status(404).json({
                success : false,
                message : "Book is already exist with given data please provide the unique one",
                });
            }
            
        return res.status(200).json({
            success : true,
            data : allBooks,
        });
        
    });
    
    /**
     * Route : /books/:id
     * Method : PUT
     * Description : Update book
     * Access : Public(for now)
     * Parameters : None
     * Data : author, name, genere, price, publisher, id
    */

    router.put('/:id', (req, res)=>{
        const { id } = req.params;
        const { data } = req.body;

        const book = books.find((each)=>each.id === id);
        if(!book){
            return res.status(400).json({
                success : false,
                message : "No Book exist with given id",
                });        
        }

        const updateData = books.map((each)=>{
            if(each.id === id){
                return {...each, ...data};
            }
            return each;
        });
        return res.status(200).json({
            success : true,
            data : updateData,
        });
    });


    







// default exports
module.exports = router;

