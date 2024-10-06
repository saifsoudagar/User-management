import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon from react-icons

const CreateUserForm = ({ closeModal, onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: ''
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name is required and should be at least 3 characters.';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    // Address validation
    if (!formData.address.street || !formData.address.city) {
      newErrors.address = 'Both street and city are required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name.split('.')[1]]: value }
      });
    } else if (name.includes('company')) {
      setFormData({
        ...formData,
        company: { ...formData.company, [name.split('.')[1]]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Simulate username generation
    const newUser = {
      ...formData,
      username: `USER-${formData.name.replace(/\s+/g, '')}`, // Remove spaces for username
      id: Date.now() // Temporary ID before API assigns one
    };

    // Make POST request to create the user
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        onUserCreated(response.data); // Call parent function to add new user
        closeModal(); // Close the modal
      })
      .catch(error => {
        console.error('Error creating user:', error); // Log any error
        alert('Failed to create user. Please try again.');
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-4 overflow-y-auto relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-medium mb-1">Street</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
