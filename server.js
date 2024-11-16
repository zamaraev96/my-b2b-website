const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const products = [
  { name: 'Product 1' },
  { name: 'Product 2' },
  { name: 'Product 3' },
];

app.use(express.static('public'));

app.get('/api/products', (req, res) => {
  const searchQuery = req.query.search.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery)
  );
  res.json(filteredProducts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});