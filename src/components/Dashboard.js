import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to Wings Cafe  System</p>
      <div className="stats-container">
        <div className="stat-box">
          <h3>Products</h3>
          <p>Total: 2</p>
        </div>
        <div className="stat-box">
          <h3>Low Stock</h3>
          <p>Items: 0</p>
        </div>
        <div className="stat-box">
          <h3>Sales</h3>
          <p>Today: M0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;