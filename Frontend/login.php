<?php 
include 'connect.php';

if (isset($_POST['signin'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM Users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        if (password_verify($password, $row['password'])) {
            $updateSignInTime = "UPDATE Users SET signintime = NOW() WHERE username='$username'";
            if ($conn->query($updateSignInTime) === TRUE) {
                session_start();
                $_SESSION['username'] = $row['username'];  
                header("Location: home.php");  
                exit();
            } 
            else {
                echo "Error updating sign-in time: ".$conn->error; 
            }
        } 
        else {
            showError();
        }
    } 
    else {
        showError();
    }
}

function showError() {
    echo "<div class='errorContainer'>";
    echo "<span class='error'>Incorrect Username or Password</span>";
    echo "<button class='backBtn' onclick='history.back()'>Go Back</button>";
    echo "</div>";
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
