import cartsModel from "../models/carts.js"

class CartsRepository {
  constructor(){
      this.model = cartsModel;
  }
  getCarts = async () => {
      try {
        const carts = await this.model.find();
        return carts;
      } catch (error) {
        console.log(error);
      }
    };
getCartById = async (id) => {
  try {
    const cart = await this.model
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
    const createdCart = this.model.create(cart);
    return createdCart;
  } catch (error) {
    console.log(error);
  }
};
addProduct = async (cartId, productId, quantity) => {
  try {
    const productExist = await this.model.findOne({
      products: { $elemMatch: { product: productId } },
    });
    if (!productExist) {
      const updatedCart = await this.model.updateOne(
        { _id: cartId },
        { $push: { products: [{ product: productId, quantity }] } }
      );
      return updatedCart;
    }
    const updatedCart = await this.model.updateOne(
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
    const updatedCart = await this.model.updateOne(
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
    const updatedCart = await this.model.updateOne(
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
    const result = await cartDao.deleteAllProducts(cartId);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

updateProductQuantity = async (cartId, productId, quantity) => {
  try {
    const updatedCart = await this.model.updateOne(
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
export const cartsRepository = new CartsRepository();