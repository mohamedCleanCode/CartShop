// Main varibles
let productsContainer = document.querySelector(".products");
let cartBadge = document.querySelector(".cart-badge");
let cart = document.querySelector(".cart");

cartBadge.addEventListener("click", () => {
  cart.classList.toggle("open");
});

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
      mainDiv.appendChild(img);
      mainDiv.appendChild(DivInfo);
      mainDiv.appendChild(button);
      productsContainer.appendChild(mainDiv);
    });
  });
