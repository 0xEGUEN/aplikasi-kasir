const express = require('express');
const router = express.Router();
const db = require('../db/database');
router.get('/', async (req, res) => {
  try {
    const products = await db.all('SELECT * FROM products ORDER BY name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price required' });
    }
    const result = await db.run(
      'INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)',
      [name, price, category || '', stock || 0]
    );
    res.status(201).json({ id: result.id, name, price, category: category || '', stock: stock || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const id = req.params.id;
    await db.run(
      'UPDATE products SET name = ?, price = ?, category = ?, stock = ? WHERE id = ?',
      [name, price, category, stock, id]
    );
    res.json({ id, name, price, category, stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
