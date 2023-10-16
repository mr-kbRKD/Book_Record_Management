#book-record-management

This is a book record management API Backend for the management of records and books

# API Documentation link
https://documenter.getpostman.com/view/30479618/2s9YR3eGLY

# Routes and Endpoints 

## /users 
POST : Create a new user. ✅
GET : Get all list of users. ✅ 

## /users/{id}
GET : Get a user by id ✅✅
PUT : Update a user by id
DELETE : Delete a user by id (check if user still has an issued book) (is there any fine to be paid) 

## /users/subscription-details/{id}  ✅
GET : Get user subscription details
1. Date of subscription
2. Valid till
3. Find if any

## /books
GET : Get all books (list) ✅
POST : Create/Add a new book ✅

## /books/{id}
GET : Get a book by id ✅
PUT : Update a book by id
DELETE : Delete a book by id

## /books/issued/books  ✅
GET : Get all issued books

## /books/issued/withfine
GET : Get all issued book with fine


# Subscription Types 
Basic (3 months)
Standard (6 months)
Premium (12 months)

NOTE : dates format will be : mm/dd/yyyy

If the subscription date is 12/10/23
and subscription type is basic
the valid till date will be 12/01/24

If he has an issued book and the issued book is to be returned at 01/01/23
and he misses it, then he gets a fine of Rs 100./

If he has an issued book and the issued book is to be returned at 01/01/23
If he missed the date of return, and his subscription also expires, then he will get a fine of Rs 200./