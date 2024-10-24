CREATE TABLE Users(
   userid int PRIMARY KEY AUTO_INCREMENT,
   username VARCHAR(50),
   password VARCHAR(50),
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   salary FLOAT,
   age INTEGER,
   registerday DATE,
   signintime DATETIME
);

INSERT INTO Users VALUES (NULL, 'dawlat_hamad', 'young', 'Dawlat', 'Hamad', 45000.00, 24, '2024-10-24', '2024-10-24 08:30:00');
INSERT INTO Users VALUES (NULL, 'john_doe', 'securePassword123', 'John', 'Doe', 55000.00, 30, '2024-10-19', '2024-10-19 08:30:00');
INSERT INTO Users VALUES (NULL, 'jane_doe', 'securePassword456', 'Jane', 'Doe', 62000.00, 28, '2024-10-18', '2024-10-18 09:00:00');
INSERT INTO Users VALUES (NULL, 'alice_smith', 'password789', 'Alice', 'Smith', 58000.00, 32, '2024-10-17', '2024-10-17 10:15:00');
INSERT INTO Users VALUES (NULL, 'bob_johnson', 'pass1234', 'Bob', 'Johnson', 47000.00, 26, '2024-10-16', '2024-10-16 11:45:00');
INSERT INTO Users VALUES (NULL, 'charlie_brown', 'mypassword', 'Charlie', 'Brown', 72000.00, 35, '2024-10-15', '2024-10-15 08:30:00');
INSERT INTO Users VALUES (NULL, 'david_wilson', 'qwertyuiop', 'David', 'Wilson', 50000.00, 29, '2024-10-14', '2024-10-14 12:00:00');
INSERT INTO Users VALUES (NULL, 'eve_davis', 'password1234', 'Eve', 'Davis', 65000.00, 31, '2024-10-13', '2024-10-13 14:20:00');
INSERT INTO Users VALUES (NULL, 'frank_miller', 'frankpassword', 'Frank', 'Miller', 55000.00, 27, '2024-10-12', '2024-10-12 15:45:00');
INSERT INTO Users VALUES (NULL, 'grace_lee', 'gracepass', 'Grace', 'Lee', 64000.00, 34, '2024-10-11', '2024-10-11 16:30:00');
INSERT INTO Users VALUES (NULL, 'henry_thompson', 'henrypwd', 'Henry', 'Thompson', 59000.00, 33, '2024-10-10', '2024-10-10 18:00:00');
