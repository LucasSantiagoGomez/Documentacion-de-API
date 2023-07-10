import { cartsRepository } from "../repositories/cart.repository.js";

class CartService {
  constructor() {}

  getCarts = async () => {
    const carts = await cartsRepository.getCarts();
    return carts;
};

getCartById = async (cartId) => {
    const cart = await cartsRepository.getCartById(cartId);
    if (!cart) return console.log("Cart not found");
    const { products } = cart;
    if (!products) return console.log("Products not found");
    const cartIsEmpty = !cart.products?.length;
    products.forEach((product) => {
        product.subTotal = product.product.price * product.quantity;
    });
    const totalPrice = products.reduce((acc, product) => {
        return acc + parseFloat(product.subTotal);
    }, 0);

    const result = { cart, cartId, cartIsEmpty, products, totalPrice };

    return result;
};

  async addCart() {
    try {
      const newCart = await cartsRepository.addCart();
      return newCart;
    } catch (error) {
      console.log(`Failed to create cart with error: ${error}`);
      throw error;
    }
  }

  async addToCart(cid, pid, quantity) {
    try {
      const productAddedToCart = await cartsRepository.addToCart(
        cid,
        pid,
        quantity
      );
      return productAddedToCart;
    } catch (error) {
      console.log(`Failed to add to cart with error: ${error}`);
      throw error;
    }
  }

  async updateCart(cid, products) {
    try {
      const updatedCart = await cartsRepository.updateCart(cid, products);
      return updatedCart;
    } catch (error) {
      console.log(`Failed to update cart with error: ${error}`);
      throw error;
    }
  }

  async updateProductFromCart(cid, pid, quantity) {
    try {
      const updatedProductFromCart = await cartsRepository.updateProductFromCart(
        cid,
        pid,
        quantity
      );

      return updatedProductFromCart;
    } catch (error) {
      console.log(`Failed to update product from cart with error: ${error}`);
      throw error;
    }
  }

  async deleteCart(cid) {
    try {
      const deletedCart = await cartsRepository.deleteCart(cid);
      return deletedCart;
    } catch (error) {
      console.log(`Failed to delete cart with error: ${error}`);
      throw error;
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const deletedProductFromCart = await cartsRepository.deleteProductFromCart(
        cid,
        pid
      );
      return deletedProductFromCart;
    } catch (error) {
      console.log(`Failed to delete product from cart with error: ${error}`);
      throw error;
    }
  }
}

export const cartsService = new CartService();