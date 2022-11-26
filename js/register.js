let userName = document.querySelector("#user-name");
let userEmail = document.querySelector("#user-email");
let userPassword = document.querySelector("#user-password");
let signUp = document.querySelector("#sign-form");

signUp.addEventListener("submit", register);

function register(e) {
  e.preventDefault();
  if (
    userName.value !== "" &&
    userEmail.value !== "" &&
    userPassword.value !== ""
  ) {
    localStorage.setItem("username", userName.value);
    localStorage.setItem("useremail", userEmail.value);
    localStorage.setItem("userpassword", userPassword.value);
    Swal.fire("Success!", "You will go to login page.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  } else {
    Swal.fire("Please check data.");
  }
}
