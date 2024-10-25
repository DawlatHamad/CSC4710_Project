<?php
session_start();
include("connect.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password']; 
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $salary = $_POST['salary'];
    $age = $_POST['age'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO Users (username, password, firstname, lastname, salary, age) VALUES ('$username', '$hashedPassword', '$firstname', '$lastname', '$salary', '$age')";
    
    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'data' => ['userid' => mysqli_insert_id($conn), 'username' => $username, 'firstname' => $firstname, 'lastname' => $lastname, 'salary' => $salary, 'age' => $age]]);
    } 
    else {
        echo json_encode(['success' => false, 'message' => 'User insertion failed.']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_username'], $_POST['login_password'])) {
    $loginUsername = $_POST['login_username'];
    $loginPassword = $_POST['login_password'];

    $query = "SELECT * FROM Users WHERE username='$loginUsername'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        
        if (password_verify($loginPassword, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            echo json_encode(['success' => true, 'message' => 'Successful.']);
        } 
        else {
            echo json_encode(['success' => false, 'message' => 'Invalid Password.']);
        }
    } 
    else {
        echo json_encode(['success' => false, 'message' => 'User Not Found.']);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"/>
    <link rel="stylesheet" href="stylesheet.css">
    <title>DASH</title>
</head>
<body>
    <div class="nav">
        <div class="logo">
            <h1>DASH</h1>
        </div>
        <div class="name-logOut">
            <div class="name">
                <?php 
                if (isset($_SESSION['username'])) {
                    $username = $_SESSION['username'];
                    $query = mysqli_query($conn, "SELECT Users.* FROM `Users` WHERE Users.username='$username'");
                    while ($row = mysqli_fetch_array($query)) {
                        echo '<span class="user-name">' . $row['firstname'] . ' ' . $row['lastname'] . '</span>';
                    }
                }
                ?>
            </div>
            <div class="logOut">
                <a href="index.php">
                    <button class="home_btn" type="button">Log Out</button>
                </a>
            </div>
        </div>
    </div>
    
    <main>
        <div>
            <label for="userid-search-input">User ID:</label>
            <input placeholder="Enter User ID" id="userid-search-input">
            <button id="search-btn-1" class="search-btn" type="button">Search</button> &thinsp; <br><br>

            <label for="firstname-search-input">First Name:</label>
            <input placeholder="Enter First Name" id="firstname-search-input">
            <label for="lastname-search-input">Last Name:</label>
            <input placeholder="Enter Last Name" id="lastname-search-input">
            <button id="search-btn-2" class="search-btn" type="button">Search</button> &thinsp; <br><br>

            <label for="minSalary-search-input">Salary Range:</label>
            <input placeholder="Enter Min Value" id="minSalary-search-input">
            <input placeholder="Enter Max Value" id="maxSalary-search-input">
            <button id="search-btn-3" class="search-btn" type="button">Search</button> &thinsp; <br><br>

            <label for="minAge-search-input">Age Range:</label>
            <input placeholder="Enter Min Age" id="minAge-search-input">
            <input placeholder="Enter Max Age" id="maxAge-search-input">
            <button id="search-btn-4" class="search-btn" type="button">Search</button> &thinsp; <br><br>

            <label for="after-search-input">After:</label>
            <input placeholder="Enter condition" id="after-search-input">
            <button id="search-btn-5" class="search-btn" type="button">Search</button> &thinsp;

            <label for="same-search-input">Same:</label>
            <input placeholder="Enter condition" id="same-search-input">
            <button id="search-btn-6" class="search-btn" type="button">Search</button> &thinsp; <br><br>

            <label>Today:</label>
            <button id="search-btn-7" class="search-btn" type="button">Search</button> &thinsp;

            <label>Never:</label>
            <button id="search-btn-8" class="search-btn" type="button">Search</button> &thinsp; <br><br>
        </div>

        <table id="table" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Salary</th>
                    <th>Age</th>
                    <th>Register Day</th>
                    <th>Sign-in Time</th> 
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </main>
    <script src="home.js"></script>
</body>
</html>
