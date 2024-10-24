const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signin'); // Adjusted to use the correct ID
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "flex";
});

signInButton.addEventListener('click', function() {
    signInForm.style.display = "flex";
    signUpForm.style.display = "none";
});
