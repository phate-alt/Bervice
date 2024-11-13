import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  // Sample product data
  const products = [
    { id: 1, name: 'Coffee', quantity: 50 },
    { id: 2, name: 'Tea', quantity: 30 },
    { id: 3, name: 'Sugar', quantity: 100 },
    { id: 4, name: 'Milk', quantity: 5 },
    { id: 5, name: 'Buns', quantity: 200 },
  ];

  const suppliers = 5;
  const lowStockCount = products.filter(product => product.quantity < 20).length;
  const outOfStockCount = products.filter(product => product.quantity === 0).length;
  const totalProducts = products.length;
  const stockValue = 3186;
  const unfulfilledOrders = 4;
  const receivedOrders = 1;

  const barChartData = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: 'Sales',
        data: products.map(product => product.quantity),
        backgroundColor: '#2F4F8F',
      },
    ],
  };

  // Log Out function to clear localStorage and navigate to sign-up page
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Remove logged in user from localStorage
    navigate('/signup'); // Redirect to the sign-up page
  };

  return (
    <div className="dashboard">
      {/* Header section with navigation links and log out button */}
      <div className="dashboard-header">
        <div className="navigation-links">
          <Link to="/product-management" className="nav-link">Product Management</Link>
          <Link to="/user-management" className="nav-link">User Management</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>

      <h2 className="dashboard-title">Inventory Management</h2>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <p>{lowStockCount}</p>
        </div>
        <div className="stat-card">
          <h3>Out of Stock</h3>
          <p>{outOfStockCount}</p>
        </div>
        <div className="stat-card">
          <h3>Suppliers</h3>
          <p>{suppliers}</p>
        </div>
      </div>

      <div className="main-content">
        <div className="side-panel">
          <h4>Value of stock</h4>
          <p className="stock-value">LSL{stockValue}</p>
          <h4>Stock Purchases</h4>
          <div className="purchase-stats">
            <p>Unfulfilled: {unfulfilledOrders}</p>
            <p>Received: {receivedOrders}</p>
          </div>
        </div>

        <div className="chart-section">
          <h3>Warehouse Stock</h3>
          <div className="chart-container">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
