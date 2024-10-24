<?php 
include 'connect.php';

if(isset($_POST['signin'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    // $password = md5($password); // hash the password before matching

    // Query to check for the username and password combination
    $sql = "SELECT * FROM Users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        // Execute the update statement to set the sign-in time
        $updateSignInTime = "UPDATE Users SET signintime = NOW() WHERE username='$username'";
        if ($conn->query($updateSignInTime) === TRUE) {
            session_start();
            $row = $result->fetch_assoc();
            $_SESSION['username'] = $row['username'];  // Store the username in session
            header("Location: home.php");  // Redirect to the home page
            exit();
        } else {
            echo "Error updating sign-in time: " . $conn->error; // Display error if update fails
        }
    } else {
        echo "Incorrect Username or Password";  // Error if no match found
    }
}
?>
