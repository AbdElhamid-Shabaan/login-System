// Attach event listeners for Sign-Up and Login buttons
document.getElementById("sign-up-btn").addEventListener("click", signUp);
document.getElementById("login-btn").addEventListener("click", login);

// Function to toggle visibility for Sign-Up
function signUpshow() {
  event.preventDefault();

  // Show sign-up form elements
  document.getElementById("name").removeAttribute("hidden");
  document.getElementById("sign-up-btn").removeAttribute("hidden");

  // Hide login-related elements
  document.getElementById("login-btn").setAttribute("hidden", true);
  document.querySelector(".sign-up-qoute").setAttribute("hidden", true);

  // Show login toggle text
  document.querySelector(".login-qoute").removeAttribute("hidden");
}

// Function to toggle back to Login
function loginShow() {
  event.preventDefault();

  // Hide sign-up form elements
  document.getElementById("name").setAttribute("hidden", true);
  document.getElementById("sign-up-btn").setAttribute("hidden", true);

  // Show login-related elements
  document.getElementById("login-btn").removeAttribute("hidden");
  document.querySelector(".sign-up-qoute").removeAttribute("hidden");

  // Hide login toggle text
  document.querySelector(".login-qoute").setAttribute("hidden", true);
}

//  Login toggle
document.querySelector(".login-qoute a").addEventListener("click", loginShow);
document
  .querySelector(".sign-up-qoute a")
  .addEventListener("click", signUpshow);

// Function to handle Sign-Up
function signUp() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required!");
    return;
  }

  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the email is already registered
  let userIsExist = users.find(function (user) {
    return user.email === email;
  });

  if (userIsExist) {
    alert("Email is already signed up. Please log in.");
    return;
  }

  // Create new user object
  let newUser = {
    name: name,
    email: email,
    password: password,
  };

  // Add new user to the array and save it to localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign-Up successful! Please log in.");

  // Reset the form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  // Back to Login view
  loginShow();
}

// Function to handle Login
function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;

  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  // Check if the user exists and the password matches
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(function (x) {
    return x.email === email && x.password === password;
  });

  if (user) {
    alert(`Welcome back, ${user.name}!`);

    // Store user info in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect to welcome page after login
    window.location.href = "welcome.html";
  } else {
    alert("Invalid email or password.");
  }

  // Reset the form
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
