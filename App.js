import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import './App.css';

// Utility function for safe JSON parsing
const safeJsonParse = (key, defaultValue = null) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error parsing JSON for key "${key}":`, error);
    return defaultValue;
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => safeJsonParse('isAuthenticated', false));
  const [isRegistered, setIsRegistered] = useState(() => safeJsonParse('isRegistered', false));

  useEffect(() => {
    console.log("isAuthenticated (useEffect):", isAuthenticated);
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("isRegistered (useEffect):", isRegistered);
    localStorage.setItem('isRegistered', JSON.stringify(isRegistered));
  }, [isRegistered]);

  const handleRegister = () => {
    setIsRegistered(true); // Update state to reflect user is registered
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Update state when user logs in successfully
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Wings Cafe Stock Inventory System</h1>
        </header>
        <main>
          <Routes>
            {/* Register Route */}
            <Route 
              path="/" 
              element={isRegistered ? <Navigate to="/login" /> : <SignUpPage onRegister={handleRegister} />} 
            />

            {/* Login Route */}
            <Route 
              path="/login" 
              element={isRegistered && !isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/product-management" element={<ProtectedRoute element={<ProductManagement />} />} />
            <Route path="/user-management" element={<ProtectedRoute element={<UserManagement />} />} />

            {/* Sign-Up Page */}
            <Route path="/signup" element={<SignUpPage onRegister={handleRegister} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
