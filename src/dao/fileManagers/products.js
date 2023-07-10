import fs from "fs";
import __dirname from "../../utils.js";
import socket from "../../socket.js";

export default class ProductManager {
  constructor() {
    this.path = `${__dirname}/files/Products.json`;
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const productsString = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsString);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const products = await this.getProducts();

      product.id =
        products.length === 0 ? 1 : products[products.length - 1].id + 1;

      products.push(product);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      socket.io.emit("product_added", product);
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      if (!product) throw new Error("Product was not found");
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, changes) => {
    try {
      const products = await this.getProducts();
      const product = await this.getProductById(id);
      const productIndex = products.findIndex((product) => product.id === id);

      if (changes.id) {
        throw new Error("Cannot modify id property");
      }

      const updatedProduct = {
        ...product,
        ...changes,
      };

      products.splice(productIndex, 1, updatedProduct);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1)
        throw new Error(`Error: Product with id ${id} does not exist.`);

      products.splice(productIndex, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      socket.io.emit("product_deleted", productIndex);

      return true;
    } catch (error) {
      console.log(error);
    }
  };
}