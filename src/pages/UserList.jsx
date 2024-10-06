import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/userService';
import CreateUserForm from '../components/CreateUserForm'; // Import CreateUserForm
import EditUserForm from '../components/EditUserForm';
import DeleteUserModal from '../components/DeleteUserModal';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false); // State for CreateUserForm

  useEffect(() => {
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch(() => alert('Failed to fetch users'));
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleUserDelete = (deletedUserId) => {
    setUsers(users.filter((user) => user.id !== deletedUserId));
  };

  const handleUserCreate = (newUser) => {
    setUsers([...users, newUser]); // Add the newly created user to the list
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>
      <button
        onClick={() => setShowCreateUserModal(true)} // Open CreateUserForm
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
      >
        Create User
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Email</th>
              <th className="py-3 px-4 text-left font-medium">Phone</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-4">
                  <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline">
                    {user.name}
                  </Link>
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => { setSelectedUser(user); setShowEditModal(true); }}
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {showEditModal && (
        <EditUserForm
          user={selectedUser}
          closeModal={() => setShowEditModal(false)}
          onUserUpdated={handleUserUpdate}
        />
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <DeleteUserModal
          user={selectedUser}
          closeModal={() => setShowDeleteModal(false)}
          onUserDeleted={handleUserDelete}
        />
      )}

      {/* Create User Modal */}
      {showCreateUserModal && (
        <CreateUserForm
          closeModal={() => setShowCreateUserModal(false)}
          onUserCreated={handleUserCreate} // Pass the user creation callback
        />
      )}
    </div>
  );
};

export default UserList;
