import { productsRepository } from "../repositories/product.repository.js";

class ProductService {
  constructor() {}

  async getProducts(page, limit, category, available, sort) {
    try {
      const products = await productsRepository.getProducts(
        page,
        limit,
        category,
        available,
        sort
      );

      return products;
    } catch (error) {
      console.log(`Failed to get products with error: ${error}`);
      throw error;
    }
  }

  getProductById = async (productId) => {
    const result = await productsRepository.getProductById(productId);
    return result;
};

getPaginatedProducts = async (filters, options) => {
    const result = await productsRepository.getPaginatedProducts(
        filters,
        options
    );
    return result;
};

addProduct = async (product, files) => {
    product.thumbnails = [];

    if (files) {
        files.forEach((file) => {
            const imageUrl = `http://localhost:3000/images/${file.filename}`;
            product.thumbnails.push(imageUrl);
        });
    }
    const result = await productsRepository.addProduct(product);
    return result;
};

updateProduct = async (productId, changes) => {
    const result = await productsRepository.updateProduct(productId, changes);
    return result;
};

deleteProduct = async (productId) => {
    const result = await productsRepository.deleteProduct(productId);
    return result;
};
}

export const productsService = new ProductService();