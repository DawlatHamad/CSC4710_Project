## Project Name
CSC 4710 Project 1

## Description
This project includes a login and register page for users, along with a home page that allows users to search for information in the database. The search functionality includes various fields to refine search results, such as User ID, First Name, Last Name, Salary Range, Age Range, and registration date conditions like 'After,' 'Same,' 'Today,' and 'Never.'

## Contributors 
Sumaiya Ahmed
Dawlat Hamad

## Directions
**Pre-requisites**: Watch the following videos to learn how to set up the database and PHP files:
- [Database and PHP Setup Video 1](https://www.youtube.com/watch?v=vrj9AohVhPA&list=LL&index=2)
- [Database and PHP Setup Video 2](https://www.youtube.com/watch?v=rHs0b2MaNpg&list=LL&index=1)

1. Create a database on your localhost with the following structure:
   ```sql
   CREATE TABLE Users (
       userid INT PRIMARY KEY AUTO_INCREMENT,
       username VARCHAR(50),
       password VARCHAR(255),
       firstname VARCHAR(50),
       lastname VARCHAR(50),
       salary FLOAT,
       age INT,
       registerday DATE,
       signintime DATETIME
   );   
2. Folder setup is as follows:
TEST
|→ Backend 
    |→ .env 		Stores the database credentials 
    |→ app.js 		Backend server script: handles API request 
    |→ dbService.js 	Database interactions and queries
|→ Frontend 
    |→ connect.php 	Connects PHP scripts to database
    |→ home.js 		Functionality for home page
    |→ home.php 	HTML for home page
    |→ index.js 		Functionality for main page
    |→ index.php 	HTML for main page
    |→ login.php 	User login functionality 
    |→ register.php 	Handles user registration
    |→ stylesheet.css	Styling for HTML pages
3. You can use the zip file to access the codes.
4. Run the following commands in the terminal to connect the database to your code:
    cd Backend
    nodemon app
5. Test the application by creating a user, logging in, and performing database searches.
6. Log out once testing is complete.

# Youtube Link
- [CSC4710-Project1] https://youtu.be/PM8LRNEXPiQ
