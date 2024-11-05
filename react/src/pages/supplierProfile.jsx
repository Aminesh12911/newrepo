import React, { useState, useEffect } from 'react';
import './Css/SupplierProfile.css';

const SupplierProfile = () => {
  const [supplier, setSupplier] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cell: '',
    home: '',
    gender: '',
  });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/supplier/supplierProfile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const supplierData = await response.json();
          setSupplier(supplierData);
          setFormData({
            name: supplierData.name,
            cell: supplierData.cell,
            home: supplierData.home,
            gender: supplierData.gender,
          });
        } else {
          console.log("Failed to fetch supplier details");
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchSupplierDetails();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8000/order/getOrder", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const orderData = await response.json();
          setOrders(orderData);
          console.log(orderData);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (error) {
        setError("Error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8000/supplier/updateSupplierProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedSupplier = await response.json();
        setSupplier(updatedSupplier);
        setIsEditing(false);
      } else {
        console.log("Failed to update supplier profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleStatusChange = async (orderId) => {
    console.log("Updating status for order:", orderId);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8000/order/updateOrder/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Completed" }),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: "completed" } : order
          )
        );
      } else {
        console.log("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <h2>DairyOps</h2>
        </div>
        <ul className="nav-menu">
          <li>Settings</li>
          <li>Feedback Corner</li>
          <li>Reports</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-icons">
            <span className="notification-icon">🔔</span>
            <span className="user-avatar">
              <img src="https://via.placeholder.com/40" alt="Supplier Avatar" />
            </span>
          </div>
        </div>

        <div className="profile-details-container">
          <div className="profile-card">
            <img src="https://via.placeholder.com/100" alt="Profile" className="profile-image" />
            {isEditing ? (
              <>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input name="cell" value={formData.cell} onChange={handleChange} placeholder="Cell" />
                <input name="home" value={formData.home} onChange={handleChange} placeholder="Home" />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <h3>{supplier.name}</h3>
                <p>ID Number: {supplier.supplierId}</p>
                <p>Email: {supplier.email}</p>
                <p>Cell: {supplier.cell}</p>
                <p>Home: {supplier.home}</p>
                <p>Gender: {supplier.gender}</p>
                <button onClick={handleEditClick}>Edit</button>
              </>
            )}
          </div>

          <div className="orders-section">
            <h4>Pending Deliveries</h4>
            {error ? (
              <p>{error}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product Description</th>
                    <th>Quantity</th>
                    <th>Proof</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Invoice</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>{order.description}</td>
                      <td>{order.quantity}</td>
                      <td>{order.proof ? <a href={order.proof}>View</a> : 'N/A'}</td>
                      <td>${order.amount}</td>
                      <td>{order.status}</td>
                      <td>{order.invoice ? <a href={order.invoice}>Invoice</a> : 'N/A'}</td>
                      <td>
                        {order.status === "Pending" && (
                          <button onClick={() => handleStatusChange(order.orderId)}>
                            Change to Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
