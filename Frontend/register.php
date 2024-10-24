
<?php 

include 'connect.php';

if(isset($_POST['signUp'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    // $password = md5($password); // encrypt password
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $salary = $_POST['salary'];
    $age = $_POST['age'];

    $checkUsername = "SELECT * From Users where username='$username'";
    $result = $conn->query($checkUsername);

    if ($result->num_rows > 0) {
        echo "Username Already Exists!";
    } else {
        // Modify the insert query to include the current date and time
        $insertQuery = "INSERT INTO Users (username, password, firstname, lastname, salary, age, registerday, signintime) 
                        VALUES ('$username', '$password', '$firstname', '$lastname', '$salary', '$age', CURDATE(), NOW())";

        if ($conn->query($insertQuery) === TRUE) {
            header("location: index.php");
        } else {
            echo "Error: " . $conn->error;
        }
    }
}

?>
