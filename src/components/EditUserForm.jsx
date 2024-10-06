import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from 'react-icons/ai'; // Importing close icon from react-icons

const EditUserForm = ({ user, closeModal, onUserUpdated }) => {
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({});

  // Toast notification for error
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

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

    // Company Name validation (optional)
    if (formData.company.name && formData.company.name.length < 3) {
      newErrors.company = 'Company name should be at least 3 characters, if provided.';
    }

    // Website validation (optional)
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    if (formData.website && !urlPattern.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before sending
    if (!validate()) return;

    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData);
      onUserUpdated(response.data);
      notifySuccess('User updated successfully!');
      closeModal();
    } catch (error) {
      notifyError('Failed to update user. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md h-auto p-4 overflow-y-auto relative">
        <ToastContainer />
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="flex-grow overflow-auto">

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Street</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Company Name (Optional)</label>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {errors.company && <p className="text-red-500">{errors.company}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Website (Optional)</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {errors.website && <p className="text-red-500">{errors.website}</p>}
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
