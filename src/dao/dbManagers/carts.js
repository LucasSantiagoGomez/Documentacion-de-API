import cartsModel from "../models/carts.js";

export default class CartManager {
  constructor() {}

  getCarts = async () => {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await cartsModel
        .findOne({ _id: id })
        .populate("products.product")
        .lean();
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  addCart = async (cart) => {
    try {
      const createdCart = cartsModel.create(cart);
      return createdCart;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cartId, productId, quantity) => {
    try {
      const productExist = await cartsModel.findOne({
        products: { $elemMatch: { product: productId } },
      });

      if (!productExist) {
        const updatedCart = await cartsModel.updateOne(
          { _id: cartId },
          { $push: { products: [{ product: productId, quantity }] } }
        );
        return updatedCart;
      }

      const updatedCart = await cartsModel.updateOne(
        { _id: cartId },
        { $inc: { "products.$[elem].quantity": quantity } },
        { arrayFilters: [{ "elem.product": productId }] }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  addProducts = async (cartId, products) => {
    try {
      const updatedCart = await cartsModel.updateOne(
        { _id: cartId },
        { $set: { products } }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (cartId, productId) => {
    try {
      const updatedCart = await cartsModel.updateOne(
        { _id: cartId },
        { $pull: { products: { product: productId } } }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  deleteAllProducts = async (cartId) => {
    try {
      const updatedCart = await cartsModel.updateMany(
        { _id: cartId },
        { $set: { products: [] } },
        { multi: true }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartsModel.updateOne(
        { _id: cartId },
        { $set: { "products.$[elem].quantity": quantity } },
        { arrayFilters: [{ "elem.product": productId }] }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };
}


