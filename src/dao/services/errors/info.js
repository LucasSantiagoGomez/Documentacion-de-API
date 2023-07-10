export const generateProductErrorInfo = (product) => {
	return `One or more properties were incomplete or not valid.
    * title: Error needs to be a string ${product.title}
    * description: Error needs to be a string ${product.description}
    * category: Error needs to be a string ${product.category}
    * code: Error needs to be a string ${product.code}
    * price: Error needs to be a Float number ${product.price}
    * stock: Error needs to be a Integer number ${product.stock}
    * stock: Eerror needs to be a string ${product.stock}
    `;
};