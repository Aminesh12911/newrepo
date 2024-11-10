import React, { useState, useEffect } from 'react';
import './Css/inventoryInward.css';

const InwardInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState('');

  // Fetch inventory data from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:8000/inwardInventory/getInwardInventory', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setInventory(data);
        } else {
          setError('Failed to fetch inventory data');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('An error occurred while fetching inventory data');
      }
    };

    fetchInventory();
  }, []);

  // Function to handle quantity change for a product
  const handleQuantityChange = (productId, amount) => {
    setInventory(prevInventory => prevInventory.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity + amount, 0) }
        : item
    ));
  };

  return (
    <div className="inventory-container">
      <h1>Inward Inventory</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Inventory Table */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.id, 1)}>Add</button>
                <button onClick={() => handleQuantityChange(item.id, -1)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InwardInventory;
