import React, { useState, useEffect } from 'react';
import './Css/invoice.css';
import { useParams } from 'react-router-dom';

const Invoice = () => {
  const { orderId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supplierData, setSupplierData] = useState(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        if (!orderId) {
          setError('Order ID is missing');
          return;
        }

        // Fetch the invoice data for the order using orderId
        const response = await fetch(`http://localhost:8000/order/getParticularOrder/${orderId}`);
        const data = await response.json();

        if (response.ok) {
          setInvoiceData(data);

          // Fetch supplier details
          const supplierResponse = await fetch(`http://localhost:8000/supplier/getParticularSupplier/${data.supplierId}`);
          const supplier = await supplierResponse.json();
          if (supplierResponse.ok) {
            setSupplierData(supplier);
          } else {
            setError('Failed to fetch supplier data');
          }

          // Fetch product details
          const productResponse = await fetch(`http://localhost:8000/product/getParticularProduct/${data.productId}`);
          const product = await productResponse.json();
          if (productResponse.ok) {
            setProductData(Array.isArray(product) ? product : [product]); // Ensure array format
          } else {
            setError('Failed to fetch product data');
          }

        } else {
          setError('Failed to fetch invoice data');
        }
      } catch (error) {
        setError('An error occurred: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!invoiceData) return <p>No invoice data available</p>;

  const { orderId: orderNumber, orderDate, description, amount } = invoiceData;

  return (
    <div className="invoice-container">
      <h1>Invoice</h1>

      <div className="invoice-header">
        <div className="order-info">
          <h3>Invoice Number: {orderNumber}</h3>
          <p>Order Date: {new Date(orderDate).toLocaleDateString()}</p>
          <p>Description: {description}</p>
        </div>
        <div className="customer-info">
          <h3>Amount:</h3>
          <p>{`$${amount.toFixed(2)}`}</p>
        </div>
      </div>

      {supplierData && (
        <div className="supplier-details">
          <h3>Supplier Details:</h3>
          <p>Name: {supplierData.name}</p>
          <p>Email: {supplierData.email}</p>
          <p>Contact: {supplierData.cell}</p>
        </div>
      )}

      {productData.length > 0 && (
        <table className="invoice-items">
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{`$${item.price.toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="invoice-summary">
        <h2>Total Amount: ${amount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Invoice;
