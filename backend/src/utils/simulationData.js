const mockProducts = [
  { name: 'Kopi Espresso', price: 15000, category: 'Minuman', stock: 50 },
  { name: 'Kopi Americano', price: 12000, category: 'Minuman', stock: 60 },
  { name: 'Kopi Cappuccino', price: 18000, category: 'Minuman', stock: 40 },
  { name: 'Teh Hijau', price: 10000, category: 'Minuman', stock: 70 },
  { name: 'Smoothie Mangga', price: 20000, category: 'Minuman', stock: 30 },
  { name: 'Roti Bakar', price: 15000, category: 'Makanan', stock: 25 },
  { name: 'Donat Cokelat', price: 8000, category: 'Makanan', stock: 45 },
  { name: 'Croissant Keju', price: 12000, category: 'Makanan', stock: 20 },
  { name: 'Sandwich Tuna', price: 25000, category: 'Makanan', stock: 15 },
  { name: 'Kue Strawberry', price: 30000, category: 'Makanan', stock: 10 },
];
const generateMockTransactions = () => {
  const transactions = [];
  const today = new Date();
  for (let i = 0; i < 20; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const txDate = new Date(today);
    txDate.setDate(txDate.getDate() - daysAgo);
    txDate.setHours(Math.floor(Math.random() * 14) + 7, Math.floor(Math.random() * 60), 0);
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items = [];
    let total = 0;
    for (let j = 0; j < itemCount; j++) {
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const qty = Math.floor(Math.random() * 3) + 1;
      const subtotal = product.price * qty;
      total += subtotal;
      items.push({
        product_name: product.name,
        product_id: j + 1,
        quantity: qty,
        price: product.price,
        subtotal: subtotal,
      });
    }
    const discount = Math.random() > 0.8 ? Math.floor(total * 0.1) : 0;
    const finalPrice = total - discount;
    const payment = finalPrice + Math.floor(Math.random() * 50000 / 1000) * 1000;
    const changeAmount = payment - finalPrice;
    transactions.push({
      items,
      totalPrice: total,
      discount,
      finalPrice,
      payment,
      changeAmount,
      transactionDate: txDate.toISOString(),
    });
  }
  return transactions;
};
module.exports = {
  mockProducts,
  generateMockTransactions,
};
