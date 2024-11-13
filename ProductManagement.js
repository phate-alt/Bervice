import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductManagement.css';  // Importing the combined CSS file

const ProductManagement = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // Form validation
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "Valid price is required";
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = "Valid quantity is required";
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/MyProducts', {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            });
            alert('Product added successfully: ' + response.data.name);

            // Reset form data after successful submit
            setFormData({ name: '', description: '', category: '', price: '', quantity: '' });
        } catch (error) {
            console.error(error);
            alert('Error adding product: ' + (error.response?.data?.error || error.message));
        }
    };

    // Handle navigation back to dashboard
    const handleBack = () => {
        navigate('/dashboard');
    };

    // Handle user log out
    const handleLogOut = () => {
        localStorage.removeItem('authToken');
        navigate('/signup');
    };

    return (
        <section className="product-management">
            <h2>Manage Products</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                />
                {errors.name && <span className="error-message">{errors.name}</span>}

                <input 
                    type="text" 
                    name="description" 
                    placeholder="Product Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                />
                {errors.description && <span className="error-message">{errors.description}</span>}

                <input 
                    type="text" 
                    name="category" 
                    placeholder="Product Category" 
                    value={formData.category} 
                    onChange={handleChange} 
                />
                {errors.category && <span className="error-message">{errors.category}</span>}

                <input 
                    type="number" 
                    name="price" 
                    placeholder="Product Price" 
                    value={formData.price} 
                    onChange={handleChange} 
                />
                {errors.price && <span className="error-message">{errors.price}</span>}

                <input 
                    type="number" 
                    name="quantity" 
                    placeholder="Product Quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                />
                {errors.quantity && <span className="error-message">{errors.quantity}</span>}

                <button type="submit">Add Product</button>
            </form>

            <button className="back" onClick={handleBack}>Back to Dashboard</button>
            <button className="logout" onClick={handleLogOut}>Log Out</button>
        </section>
    );
};

export default ProductManagement;
