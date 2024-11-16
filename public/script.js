function searchProducts() {
  const query = document.getElementById('search-input').value;
  fetch(`/api/products?search=${query}`)
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.textContent = product.name;
        productList.appendChild(productDiv);
      });
    })
    .catch(error => console.error('Error:', error));
}