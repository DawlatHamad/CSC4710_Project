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
    <div class="container" id="signup" style="display: none;">
        <div class="box form-box">
            <header>Sign Up</header>
            <form action="register.php" method="post">
                <div class="field input">
                    <label for="username-input">Username</label>
                    <input type="text" name="username" id="username-input" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="password-input">Password</label>
                    <input type="password" name="password" id="password-input" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="firstname-input">First Name</label>
                    <input type="text" name="firstname" id="firstname-input" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="lastname-input">Last Name</label>
                    <input type="text" name="lastname" id="lastname-input" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="salary-input">Salary</label>
                    <input type="number" step="0.01" name="salary" id="salary-input" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="age-input">Age</label>
                    <input type="number" name="age" id="age-input" autocomplete="off" required>
                </div>
                <div class="field">
                    <button type="submit" class="btn" name="signUp" id="add-user-btn">Sign Up</button>
                </div>
                <div class="links">
                    Already have an Account? <a href="#" id="signInButton">Log In</a>
                </div>
            </form>
        </div>
    </div>

    <div class="container" id="signin">
        <div class="box form-box">
            <header>Login</header>
            <form action="login.php" method="post">
                <div class="field input">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" autocomplete="off" required>
                </div>
                <div class="field input">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" autocomplete="off" required>
                </div>
                <div class="field">
                    <input type="submit" class="btn" name="signin" value="Login">
                </div>
                <div class="links">
                    Need an Account? <a href="#" id="signUpButton">Sign Up</a>
                </div>
            </form>
        </div>
    </div>

    <script src="index.js"></script>
</body>
</html>
