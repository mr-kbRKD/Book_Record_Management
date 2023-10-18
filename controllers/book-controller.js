const {UserModal, BookModal} = require('../modals');
const IssuedBook = require('../dtos/book-dtos')


exports.getAllBooks = async (req, res) =>{
    const books = await BookModal.find();

    if(books.length === 0){
        return res.status(404).json({
            success : false,
            message : "No books found",
        });
    };  

    return res.status(200).json({
        success : true,
        data : books,
    });
}

exports.getSingleBookByID = async (req, res)=>{
        const { id } = req.params;
        const book = await BookModal.findById(id);
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
    };
exports.getBookByName = async (req, res)=>{
        const { name } = req.params;
        // console.log(name);
        // using findOne() function
        const book = await BookModal.findOne({
            name : name,
        });
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
    };

exports.getAllIssuedBooks = async (req, res)=>{
    const users = await UserModal.find({
        issuedBook : { $exists : true},
    }).populate("issuedBook");


    const issuedBooks = users.map((each) => new IssuedBook(each)); 
    if(issuedBooks.length === 0)
    {
        return res.status(404).json({
            success : false,
            message : "No book issued yet",
        });
    }
        
        return res.status(200).json({
            success : true,
            data : issuedBooks,
        });
};


exports.addNewBook = async (req, res)=>{
    const { data } = req.body;
    
    if(!data){
        return res.status(404).json({
            success : false,
            message : "No data provided for book",
            });
        }
        await BookModal.create(data);
        const allBooks = await BookModal.find();

        return res.status(200).json({
            success : true,
            data : allBooks,
        });
        
    };

exports.updateBookByID = async(req, res)=>{
    const { id } = req.params;
    const { data } = req.body;

    const updatedBook = await BookModal.findOneAndUpdate({
        _id  : id,
    }, data, {
        // to fetch or get new data otherwise updates will reflect but show us old data(that's why its required)
        new : true,
    });
    return res.status(200).json({
        success : true,
        data : updatedBook,
    });
}
