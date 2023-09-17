import express from 'express';
import { productManager } from './ProductManager.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  try {
    console.log(!req.query.limit);
    let products = await productManager.getProducts();
    if (req.query.limit) products = products.slice(0, req.query.limit);
    if (!products.length) return res.status(200).json({ message: 'No products' });
    return res.status(200).json({ message: 'Products found', products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(+req.params.pid);
    if (product === 'Not found') return res.status(400).json({ message: 'Product not found' });
    return res.status(200).json({ message: 'Product found', product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
