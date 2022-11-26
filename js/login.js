let userName = document.querySelector("#user-name");
let userPassword = document.querySelector("#user-password");
let signUp = document.querySelector("#sign-form");

let getUserName = localStorage.getItem("username");
let getUserPassword = localStorage.getItem("userpassword");
console.log();

signUp.addEventListener("submit", login);

function login(e) {
  e.preventDefault();
  if (userName.value !== "" && userPassword.value !== "") {
    if (
      userName.value.trim() === getUserName &&
      userPassword.value == getUserPassword
    ) {
      Swal.fire("Correct!", "You will go to home.");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      Swal.fire("User name or password is wrong!");
      console.log(userName.value);
      console.log(userPassword.value);
    }
  } else {
    Swal.fire("Please check data.");
  }
}
