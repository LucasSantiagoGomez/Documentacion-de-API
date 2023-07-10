const socket = io();

// DOM element
let productsElem = document.getElementById("products");

socket.on("product_added", (product) => {
  let item = document.createElement("div");
  item.classList.add("gallery");
  item.innerHTML = `<h2>${product.title}</h2> <p>$${product.price}</p> <p>${product.description}</p>`;
  productsElem.appendChild(item);
});

socket.on("product_deleted", (productIndex) => {
  productsElem.removeChild(productsElem.children[productIndex]);
});