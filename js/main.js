// Start Cart

let cartBadge = document.querySelector(".cart-badge");
let cartContianer = document.querySelector(".cart-container");
let closeCart = document.querySelector(".close-cart");
let allProductsCart = document.querySelector(".all-products-cart");
let totalPrice = document.querySelector(".total-price");
let count = document.querySelector(".count");
cartBadge.addEventListener("click", (e) => {
  if (cartContianer.classList.contains("open-cart")) {
    cartContianer.classList.toggle("open-cart");
  } else {
    cartContianer.classList.toggle("open-cart");
  }
});
closeCart.addEventListener("click", () => {
  cartContianer.classList.toggle("open-cart");
});
document.addEventListener("click", (e) => {
  if (e.target != cartBadge && cartContianer.classList.contains("open-cart")) {
    cartContianer.classList.remove("open-cart");
  }
});

// End Cart

// Start Main Logic

let userInfo = document.querySelector(".user-info");
let userAccount = document.querySelector(".user-info a");
let links = document.querySelector(".links");
let user = localStorage.getItem("username");
let allProducts = [];

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
    data.forEach((el) => allProducts.push(el));
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
                        <button class="product-add-to-cart" onclick="addProductToCart(${
                          item.id
                        })">Add to cart</button>
                        <button class="favorite"><i class="fa-regular fa-heart"></i></button>
                    </div>
      `;
    });
    result.forEach((el) => {
      products.innerHTML += el;
    });
  });

function checkLogedInUser() {
  if (localStorage.getItem("username")) {
    console.log("true");
  } else {
    window.location.href = "login.html";
  }
}

// End Main Logic

function addProductToCart(id) {
  let choose = allProducts.find((item) => item.id === id);
  allProductsCart.innerHTML += `
  <div class="cart-box">
                                <img src="${choose.image}" alt="" class="cart-product-img">
                                <div class="cart-product-details">
                                    <div class="cart-product-title">${choose.title}</div>
                                    <div class="cart-product-price">$${choose.price}</div>
                                    <input type="number" value="1" class="cart-product-quantity">
                                </div>
                                <i class="fa-solid fa-trash cart-product-remove"></i>
                            </div>
  `;
  count.style.display = "block";
  count.innerHTML = allProductsCart.children.length;
}
