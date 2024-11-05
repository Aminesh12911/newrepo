import React, { useState, useEffect } from 'react';
import './Css/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    cell: '',
    home: '',
    gender: '',
    designation: '',
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/userProfile", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFormData({
            name: userData.name,
            dob: userData.dob,
            cell: userData.cell,
            home: userData.home,
            gender: userData.gender,
            designation: userData.designation || '',
          });
          setLoading(false);
        } else {
          setError("Failed to fetch user details.");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching user data.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch orders associated with the user
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
      const response = await fetch("http://localhost:8000/updateUserProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        setError("Failed to update user profile.");
      }
    } catch (error) {
      setError("Error updating profile.");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <h2>DairyOps</h2>
        </div>
        <ul className="nav-menu">
          <li><a href="http://localhost:5173/order">Order</a></li>
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
              <img src="https://via.placeholder.com/40" alt="User Avatar" />
            </span>
          </div>
        </div>

        <div className="profile-details-container">
          <div className="profile-card">
            <img src="https://via.placeholder.com/100" alt="Profile" className="profile-image" />
            {isEditing ? (
              <>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input name="dob" value={formData.dob} onChange={handleChange} type="date" placeholder="DOB" />
                <input name="cell" value={formData.cell} onChange={handleChange} placeholder="Cell" />
                <input name="home" value={formData.home} onChange={handleChange} placeholder="Home" />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" />
                
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <h3>{user.name}</h3>
                <p>ID Number: {user.userId}</p>
               
                <p>Email: {user.email}</p>
                <p>DOB: {new Date(user.dob).toLocaleDateString()}</p>
                <p>Cell: {user.cell}</p>
                <p>Home: {user.home}</p>
                <p>Gender: {user.gender}</p>
                <p>Designation: {user.designation}</p>
                <button onClick={handleEditClick}>Edit</button>
              </>
            )}
          </div>

          <div className="tasks-section">
            <h4>Upcoming Orders</h4>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order Description</th>
                  <th>Quantity</th>
                  <th>Proof</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
  {orders.length > 0 ? (
    orders.map(order => (
      <tr key={order.id}>
        <td>
          {order.orderDate? new Date(order.orderDate).toLocaleDateString() : 'Date not available'}
        </td>
        <td>{order.description}</td>
        <td>{order.quantity}</td>
        <td>{order.proof ? <a href={order.proof}>View</a> : 'N/A'}</td>
        <td>${order.amount}</td>
        <td>{order.status}</td>
        <td>{order.invoice ? <a href={order.invoice}>Invoice</a> : 'N/A'}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No upcoming orders</td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
