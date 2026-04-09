const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { mockProducts, generateMockTransactions } = require('../utils/simulationData');
const insertProducts = async (products) => {
  const result = [];
  for (const p of products) {
    try {
      const res = await db.run(
        'INSERT INTO products (name, price, category, stock) VALUES (?, ?, ?, ?)',
        [p.name, p.price, p.category, p.stock]
      );
      result.push({ ...p, id: res.id });
    } catch (e) {}
  }
  return result;
};
const insertTransactions = async (txs) => {
  const result = [];
  for (const tx of txs) {
    try {
      const res = await db.run(
        `INSERT INTO transactions (transaction_date, total_price, discount, final_price, payment, change_amount, status) 
         VALUES (?, ?, ?, ?, ?, ?, 'completed')`,
        [tx.transactionDate, tx.totalPrice, tx.discount, tx.finalPrice, tx.payment, tx.changeAmount]
      );
      for (const item of tx.items) {
        await db.run(
          `INSERT INTO transaction_items (transaction_id, product_id, product_name, quantity, price, subtotal) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [res.id, item.product_id, item.product_name, item.quantity, item.price, item.subtotal]
        );
      }
      result.push(res.id);
    } catch (e) {
      console.error('tx error:', e.message);
    }
  }
  return result;
};
router.post('/init', async (req, res) => {
  try {
    await db.run('DELETE FROM transaction_items');
    await db.run('DELETE FROM transactions');
    await db.run('DELETE FROM products');
    const products = await insertProducts(mockProducts);
    const txs = generateMockTransactions();
    const transactions = await insertTransactions(txs);
    res.json({ success: true, stats: { products: products.length, transactions: transactions.length } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/add-transactions', async (req, res) => {
  try {
    const { count = 10 } = req.body;
    const txs = generateMockTransactions().slice(0, count);
    const ids = await insertTransactions(txs);
    res.json({ success: true, count: ids.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/add-products', async (req, res) => {
  try {
    const { count = 5 } = req.body;
    const categories = ['Minuman', 'Makanan', 'Snack', 'Dessert'];
    const newProducts = [];
    for (let i = 0; i < count; i++) {
      newProducts.push({
        name: `Item ${Date.now() + i}`,
        price: Math.floor(Math.random() * 50000) + 5000,
        category: categories[Math.floor(Math.random() * categories.length)],
        stock: Math.floor(Math.random() * 100) + 10,
      });
    }
    const products = await insertProducts(newProducts);
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/clear-transactions', async (req, res) => {
  try {
    await db.run('DELETE FROM transaction_items');
    await db.run('DELETE FROM transactions');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/reset', async (req, res) => {
  try {
    await db.run('DELETE FROM transaction_items');
    await db.run('DELETE FROM transactions');
    await db.run('DELETE FROM products');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/stats', async (req, res) => {
  try {
    const pc = await db.get('SELECT COUNT(*) as count FROM products');
    const tc = await db.get('SELECT COUNT(*) as count FROM transactions');
    const revenue = await db.get('SELECT SUM(final_price) as total FROM transactions');
    const items = await db.get('SELECT SUM(quantity) as total FROM transaction_items');
    res.json({
      success: true,
      stats: {
        totalProducts: pc?.count || 0,
        totalTransactions: tc?.count || 0,
        totalRevenue: revenue?.total || 0,
        totalItemsSold: items?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/status', async (req, res) => {
  try {
    const pc = await db.get('SELECT COUNT(*) as count FROM products');
    const tc = await db.get('SELECT COUNT(*) as count FROM transactions');
    res.json({
      isSimulationMode: (pc?.count || 0) > 0,
      productCount: pc?.count || 0,
      transactionCount: tc?.count || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.patch('/update-stock/:productId', async (req, res) => {
  try {
    const { newStock } = req.body;
    if (newStock === undefined) return res.status(400).json({ error: 'newStock required' });
    await db.run('UPDATE products SET stock = ? WHERE id = ?', [newStock, req.params.productId]);
    const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.productId]);
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

module.exports = router;
