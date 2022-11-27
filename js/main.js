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

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => data)
  .then((data) => {
    let products = document.querySelector(".content .products");
    let result = data.map((item) => {
      return `
      <div class="product col-sm-6 col-md-4 col-md-3">
                    <img class="product-img" src="${item.image}" alt="${
        item.title
      }">
                    <div class="product-info">
                        <h2 class="product-heading">${item.title.slice(
                          0,
                          25
                        )}</h2>
                        <p class="product-desc">${item.description.slice(
                          0,
                          30
                        )}</p>
                        <p class="product-price">${item.price}</p>
                    </div>
                    <div class="product-actions">
                        <button class="product-add-to-cart">Add to cart</button>
                        <button class="favorite"><i class="fa-regular fa-heart"></i></button>
                    </div>
      `;
    });
    result.forEach((el) => {
      products.innerHTML += el;
    });
  });
