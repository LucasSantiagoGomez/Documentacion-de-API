const incrementBtn = document.querySelectorAll(".increment-btn");
const decrementBtn = document.querySelectorAll(".decrement-btn");
const cartDeleteBtn = document.querySelectorAll(".cart-delete-btn");
const cartQuantity = document.querySelectorAll(".cart-quantity");
const cartSubTotal = document.querySelectorAll(".cart-subtotal");
const cartTotal = document.querySelector(".cart-total");
const cartId = document.querySelector(".cart-main-container").id;

// Update cart quantity
incrementBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const { productId, newQuantity } = getProductValues(e, 1);
		addProductToCart(productId, cartId, newQuantity);
	});
});

// Delete product from cart
decrementBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const { productId, newQuantity } = getProductValues(e, -1);
		deleteProductFromCart(productId, cartId, newQuantity);
	});
});

// Update cart quantity
const addProductToCart = async (productId, cartId, newQuantity) => {
	try {
		updateQuantityLabel(productId, newQuantity);
		fetch(`/api/carts/${cartId}/product/${productId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	} catch (error) {
		console.log(error);
	}
};

// Delete product from cart
const deleteProductFromCart = async (productId, cartId, newQuantity) => {
	try {
		updateQuantityLabel(productId, newQuantity);
		fetch(`/api/carts/${cartId}/product/${productId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	} catch (error) {
		console.log(error);
	}
};

const getProductValues = (e, diff) => {
	const productElement =
		e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
	const productId = productElement.id;
	const productQuantityElement = productElement.querySelector(
		".product-card-quantity-value"
	).innerText;
	const newQuantity = parseInt(productQuantityElement) + diff;
	return { productId, newQuantity };
};

const updateQuantityLabel = (productId, quantity) => {
	if (quantity === 0) window.location.reload();
	const productElement = document.getElementById(productId);
	const productQuantityElement = productElement.querySelector(
		".product-card-quantity-value"
	);
	productQuantityElement.innerText = quantity;
};