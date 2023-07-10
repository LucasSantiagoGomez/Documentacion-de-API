const cartId = "6446d6fcecadebaeeb55649a";

async function addToCart(productId) {
	let response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
	  method: "POST",
	  body: JSON.stringify({ quantity: 1 }),
	  headers: {
		"Content-Type": "application/json",
	  },
	});
  
	let result = await response.json();
	console.log(result);
  }