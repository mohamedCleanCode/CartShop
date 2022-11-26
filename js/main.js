let userInfo = document.querySelector(".user-info");
let userAccount = document.querySelector(".user-info a");
let links = document.querySelector(".links");
let user = localStorage.getItem("username");

if (user) {
  links.remove();
  userInfo.style.display = "flex";
  userAccount.innerHTML = user;
}

let logoutBtn = document.querySelector("#log-out");
logoutBtn.addEventListener("click", logout);

function logout(e) {
  e.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: "You will log out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      window.location.href = "register.html";
    }
  });
}
