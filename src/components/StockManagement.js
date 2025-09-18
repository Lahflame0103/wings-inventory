import React, { useState, useEffect } from 'react';
import '../styles/StockManagement.css';
import '../styles/ProductManagement.css';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('add');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleStockAdjustment = (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    const updatedProducts = products.map(product => {
      if (product.id === parseInt(selectedProduct)) {
        const newQuantity = adjustmentType === 'add' 
          ? product.quantity + parseInt(quantity)
          : product.quantity - parseInt(quantity);
        
        return {
          ...product,
          quantity: newQuantity
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    setSelectedProduct('');
    setQuantity('');
    alert('Stock updated successfully!');
  };

  return (
    <div>
      <h2>Stock Management</h2>
      
      <form onSubmit={handleStockAdjustment} className="stock-form">
        <h3>Adjust Stock Levels</h3>
        <div className="form-group">
          <label>Select Product:</label>
          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (Current: {product.quantity})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Adjustment Type:</label>
          <select 
            value={adjustmentType} 
            onChange={(e) => setAdjustmentType(e.target.value)}
            required
          >
            <option value="add">Add Stock</option>
            <option value="subtract">Subtract Stock</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Stock</button>
      </form>

      <h3>Current Stock Levels</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Quantity</th>
            <th>Minimum Stock Level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className={product.quantity <= product.minStockLevel ? 'low-stock' : ''}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.minStockLevel}</td>
              <td>{product.quantity <= product.minStockLevel ? 'LOW STOCK' : 'OK'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagement;