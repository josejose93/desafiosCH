class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return 'Faltan datos';
    }

    if (this.products.find((product) => product.code === code)) {
      return 'Ya existe un producto con ese código';
    }

    const newProduct = {
      id: this.products.length == 0 ? 1 : this.products.sort((a, b) => b.id - a.id)[0].id + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    }
    this.products.push(newProduct);
    return this.products;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return 'Not found';
    }
    return product;
  }
}

// const productManager = new ProductManager();
// console.log(productManager.getProducts());
// console.log(productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
// console.log(productManager.getProducts());
// console.log(productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
// console.log(productManager.getProductById(1));
// console.log(productManager.getProductById(2));

const fs = require('fs');
fs.writeFileSync("archivo.txt", "Hola mundo");
