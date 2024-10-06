import React from 'react';
import { deleteUser } from '../services/userService';

const DeleteUserModal = ({ user, closeModal, onUserDeleted }) => {
  const handleDelete = () => {
    // Perform DELETE request
    deleteUser(user.id)
      .then(() => {
        // Update UI after deletion
        onUserDeleted(user.id);
        closeModal();  // Close the modal after successful deletion
      })
      .catch(() => {
        alert('Failed to delete user');
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete the user <strong>{user.name}</strong>?</p>
        
        <div className="flex justify-end">
          <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded mr-2">
            Delete
          </button>
          <button onClick={closeModal} className="bg-gray-300 py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
