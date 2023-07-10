
const cartId = "6446d6fcecadebaeeb55649a";
const forms = document.querySelectorAll(".add-form");
const products = document.querySelectorAll(".product-item-full");

forms.forEach((form) => {
	form.addEventListener("click", (e) => {
		e.preventDefault();
		const productId = e.target.closest(".add-form").id;
		try {
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
	});
});

products.forEach((product) => {
	product.addEventListener("click", (e) => {
		e.preventDefault();
		const target = e.target;
		if (target.classList.contains("add-btn")) return;
		const productId = target.querySelector(".add-form").id;
		if (!productId) return;
		try {
			window.location.href = `/product/${productId}`;
		} catch (error) {
			console.log(error);
		}
	});
});