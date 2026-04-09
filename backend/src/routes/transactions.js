const express = require('express');
const router = express.Router();
const db = require('../db/database');
router.get('/', async (req, res) => {
  try {
    const transactions = await db.all(
      'SELECT * FROM transactions ORDER BY transaction_date DESC LIMIT 100'
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const transaction = await db.get(
      'SELECT * FROM transactions WHERE id = ?',
      [req.params.id]
    );
    if (!transaction) return res.status(404).json({ error: 'Not found' });
    const items = await db.all(
      'SELECT * FROM transaction_items WHERE transaction_id = ?',
      [req.params.id]
    );
    res.json({ ...transaction, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const { items, totalPrice, discount, payment } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Items required' });
    }
    const finalPrice = totalPrice - (discount || 0);
    const changeAmount = payment - finalPrice;
    if (changeAmount < 0) {
      return res.status(400).json({ error: 'Insufficient payment' });
    }
    const result = await db.run(
      `INSERT INTO transactions (total_price, discount, final_price, payment, change_amount) 
       VALUES (?, ?, ?, ?, ?)`,
      [totalPrice, discount || 0, finalPrice, payment, changeAmount]
    );
    const txId = result.id;
    for (const item of items) {
      await db.run(
        `INSERT INTO transaction_items (transaction_id, product_id, product_name, quantity, price, subtotal) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [txId, item.id, item.name, item.quantity, item.price, item.subtotal]
      );
    }
    res.status(201).json({
      id: txId,
      totalPrice,
      discount: discount || 0,
      finalPrice,
      payment,
      changeAmount,
      itemCount: items.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
