<?php 
include 'connect.php';

if (isset($_POST['signUp'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT); 
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $salary = $_POST['salary'];
    $age = $_POST['age'];

    // Check if the username already exists
    $checkUsername = "SELECT * FROM Users WHERE username='$username'";
    $result = $conn->query($checkUsername);

    if ($result->num_rows > 0) {
        echo "<div class='errorContainer'>";
        echo "<span class='error'>Username Already Exists!</span>";
        echo "<button class='backBtn' onclick='history.back()'>Go Back</button>";
        echo "</div>";
    } 
    else {
        $insertQuery = "INSERT INTO Users (username, password, firstname, lastname, salary, age, registerday, signintime) 
                        VALUES ('$username', '$hashedPassword', '$firstname', '$lastname', '$salary', '$age', CURDATE(), NOW())";

        if ($conn->query($insertQuery) === TRUE) {
            header("location: index.php");
            exit();
        } 
        else {
            echo "Error: ".$conn->error;
        }
    }
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
</html>
