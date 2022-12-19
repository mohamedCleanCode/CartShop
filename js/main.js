// Main varibles
let productsContainer = document.querySelector(".products");
let cartBadge = document.querySelector(".cart-badge");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector(".close-cart");
let cartContent = document.querySelector(".cart-content");
let totalPrice = document.querySelector(".total-price");
let counter = document.querySelector(".counter");
let ids = [];

// Api
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      let mainDiv = document.createElement("div");
      mainDiv.className = "item col-sm-6 col-md-4 col-md-3";
      let img = document.createElement("img");
      img.className = "item-img";
      img.src = item.image;
      img.alt = item.title;
      let DivInfo = document.createElement("div");
      DivInfo.className = "item-info";
      let h2 = document.createElement("h2");
      h2.className = "item-heading";
      h2.innerHTML = `${item.title.slice(0, 30)}`;
      DivInfo.appendChild(h2);
      let pDesc = document.createElement("p");
      pDesc.className = "item-desc";
      pDesc.innerHTML = `${item.description.slice(0, 30)}`;
      DivInfo.appendChild(pDesc);
      let pPrice = document.createElement("p");
      pPrice.className = "item-price";
      pPrice.innerHTML = `$${item.price}`;
      DivInfo.appendChild(pPrice);
      let button = document.createElement("button");
      button.className = "item-add-to-cart";
      button.innerHTML = "Add To Cart";
      let id = item.id;
      button.setAttribute("onclick", `addItemToCart(${id})`);
      mainDiv.appendChild(img);
      mainDiv.appendChild(DivInfo);
      mainDiv.appendChild(button);
      productsContainer.appendChild(mainDiv);
    });
  });

// Open cart
cartBadge.addEventListener("click", () => {
  cart.classList.toggle("open");
});

// Close cart
closeCart.addEventListener("click", () => {
  cart.classList.toggle("open");
});

// Remove item from cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    e.target.parentElement.remove();
    let index = +e.target.parentElement.classList[1];
    ids = [
      ...ids.slice(0, ids.splice(ids.indexOf(index), 1)),
      ...ids.slice(ids.splice(ids.indexOf(index), 1)),
    ];
    console.log(ids);
    updateTotalPrice();
  }
});

// Add item to cart
function addItemToCart(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (ids.includes(id)) {
        alert("item is exist");
      } else {
        ids.push(id);
        cartContent.innerHTML += `
                    <div class="cart-box ${id}">
                      <img src="${data.image}" alt="" class="cart-box-img">
                      <div class="cart-details">
                          <h2 class="name-item">${data.title}</h2>
                          <p class="price-item">$${data.price}</p>
                          <input type="number" value="1" class="quantity-item">
                      </div>
                      <i class="fa-solid fa-trash remove-item"></i>
                    </div>
                  `;
        updateTotalPrice();
      }
    });
}

// Update total price
function updateTotalPrice() {
  let cartBoxs = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  counter.innerHTML = cartBoxs.length;
  for (let i = 0; i < cartBoxs.length; i++) {
    let cartBox = cartBoxs[i];
    let price = cartBox.querySelector(".price-item").innerHTML.slice(1);
    let quantity = cartBox.querySelector(".quantity-item").value;
    total += +price * +quantity;
  }
  totalPrice.innerHTML = `$${total.toFixed(2)}`;
}

// Handel input feiled
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("quantity-item")) {
    let allInputs = document.querySelectorAll(".quantity-item");
    allInputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        updateTotalPrice();
      });
    });
  }
});
