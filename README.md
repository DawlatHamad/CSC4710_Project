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
   ```
   ```sql
   INSERT INTO `Users` (`userid`, `username`, `password`, `firstname`, `lastname`, `salary`, `age`, `registerday`, `signintime`) VALUES
   (1, 'dawlat_hamad', '$2y$10$re4NaRFweAmik7C73vHSzuBoEgzRgyNV/lK.4b.TNN3Swjsx3eUui', 'Dawlat', 'Hamad', 42000, 23, '2024-10-24', '2024-10-29 17:40:28'),
   (2, 'john_doe', '$2y$10$I..dbV.6pK1SD6XRn45zKeHNgKwQyhKDfPoa4Qy0BhS5c0SKd8qzC', 'John', 'Doe', 35000, 35, '2022-05-23', '2024-10-24 22:00:16'),
   (3, 'jane_doe', '$2y$10$cn84NtCoKIqf9/Uzo6q3y.O139aXuaqK.Zs4lJcCWroSRq2lGyuxu', 'Jane', 'Doe', 46500, 47, '2020-11-14', '2024-10-25 13:45:53'),
   (4, 'alice_smith', '$2y$10$9nVeoSg4Ei6c7QPOzXH.Huzk11cx65lNqJXMULuezd3RZiYNybgia', 'Alice', 'Smith', 32000, 21, '2021-03-05', '2024-07-16 10:23:18'),
   (5, 'bob_johnson', '$2y$10$RY7R3DeQtzXzaZBVNrD/TOJxofyqseCr8BOJJ2kBy6Qb02ynR1BpS', 'Bob', 'Johnson', 47000, 37, '2020-09-12', '2024-10-29 17:58:05'),
   (6, 'charlie_brown', '$2y$10$osXgYjNgT0ePhd4mH84NBu.ElSS.Td3LimpSM5RKMkH/ocTX5jBM6', 'Charlie', 'Brown', 72000, 55, '2022-02-20', '2024-05-28 08:14:59'),
   (7, 'david_wilson', '$2y$10$ioOhau.i/ZJWUWJ.T7cnmOiN4VbglCYqrNmMB6MwKdgEg0ygDD7Gm', 'David', 'Wilson', 50000, 29, '2021-08-30', '2024-03-15 19:27:05'),
   (8, 'eve_davis', '$2y$10$F7gK.9pOMQM1H8hMugCquOm0zzdhQv6h1iXPWHUkT7ceEV39N8dWy', 'Eve', 'Davis', 65000, 31, '2020-12-02', '2024-09-22 11:05:44'),
   (9, 'frank_miller', '$2y$10$JH8uVDDmLdPvokWhq1/9Ueafr4XT/6B55oAPIEbgDi7TRhbYR8hie', 'Frank', 'Miller', 55000, 27, '2021-04-18', '2024-10-24 22:23:18'),
   (10, 'grace_lee', '$2y$10$zppqsg1Vb/JsMJKlx2VRsuUU2.F3YmUBoRoocpztxUcucRh1qx3Vi', 'Grace', 'Lee', 64000, 34, '2022-06-14', '2024-08-04 22:12:31'),
   (11, 'henry_thompson', '$2y$10$KGy2P0A6UYtZRFmSf8Mzt.ZbpzK2ysaMim0u7hMYOLDTha.qGSzGe', 'Henry', 'Thompson', 59000, 76, '2021-01-27', '2024-10-25 13:30:34'),
   (12, 'sunnah_ahmed', '$2y$10$ZQf4rka9BlqmmNr8sQYlnecIZrFt1qLuWgKjHGxHVH82JSTEc7n6m', 'Sunnah', 'Ahmed', 32000, 19, '2024-10-25', '2024-10-25 13:23:11'),
   (13, 'Sumaiya_ahmed', '$2y$10$BFdvPJI4eZAiUhJpE.o89.qdQXAgEOOX6AkwySV9c58NfN3ZHghDi', 'Sumaiya', 'Ahmed', 50000, 22, '2024-10-25', '2024-10-25 13:43:01'),
   (14, 'hamad_dawlat', '$2y$10$svvzc3E45mQjRh6UE.U9R.Ueec4po46D1KxoYPq6NQMRb/c4MZn12', 'Dawlat', 'Hamad', 40000, 22, '2024-10-29', '2024-10-29 17:55:19');
   ```
2. Folder setup is as follows:
   ```sql
   TEST
   ├── Backend 
   │   ├── .env             # Stores database credentials
   │   ├── app.js           # Backend server script, handles API requests
   │   └── dbService.js     # Database interactions and queries
   └── Frontend 
       ├── connect.php      # Connects PHP scripts to database
       ├── home.js          # Functionality for home page
       ├── home.php         # HTML for home page
       ├── index.js         # Functionality for main page
       ├── index.php        # HTML for main page
       ├── login.php        # User login functionality
       ├── register.php     # Handles user registration
       └── stylesheet.css   # Styling for HTML pages
   ```
3. You can use the zip file to access the codes.
4. Run the following commands in the terminal to connect the database to your code:
   ```sql
   cd Backend
   nodemon app
   ```
5. Test the application by creating a user, logging in, and performing database searches.
6. Log out once testing is complete.

# Youtube Link
- [CSC4710-Project1] https://youtu.be/PM8LRNEXPiQ
