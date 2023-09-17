import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) return 'Faltan datos';

      const products = await this.getProducts();
      if (products.find((product) => product.code === code)) return 'Ya existe un producto con ese código';
        
      const newProduct = {
        id: products.length == 0 ? 1 : products.sort((a, b) => b.id - a.id)[0].id + 1,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      }
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return products;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      if (!product) {
        return 'Not found';
      }
      return product;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getProducts();
      let product = products.find((product) => product.id === id);
      if (!product) return 'Not found';
      product = { ...product, ...obj };
      products[products.findIndex((product) => product.id === id)] = product;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      products = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return products;
    } catch (error) {
      return error;
    }
  }
}

export const productManager = new ProductManager('products.json');
