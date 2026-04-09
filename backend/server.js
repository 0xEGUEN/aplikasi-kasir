const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./src/db/database');
const productsRouter = require('./src/routes/products');
const transactionsRouter = require('./src/routes/transactions');
const simulationRouter = require('./src/routes/simulation');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.initializeDatabase();
app.use('/api/products', productsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/simulation', simulationRouter);
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
