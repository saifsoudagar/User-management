import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/userService';
import CreateUserForm from '../components/CreateUserForm'; 
import EditUserForm from '../components/EditUserForm';
import DeleteUserModal from '../components/DeleteUserModal';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false); 

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
    setUsers([...users, newUser]); 
  };

  return (
    <div className="container mx-auto my-8 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>
      <button
        onClick={() => setShowCreateUserModal(true)} 
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
      >
        Create User
      </button>

      <div className="overflow-x-auto"> {/* Allow horizontal scrolling on small screens */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md hidden md:table">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-2 text-left font-medium text-sm">Name</th>
              <th className="py-3 px-2 text-left font-medium text-sm">Email</th>
              <th className="py-3 px-2 text-left font-medium text-sm">Phone</th>
              <th className="py-3 px-2 text-left font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-2 text-sm">
                  <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline">
                    {user.name}
                  </Link>
                </td>
                <td className="py-3 px-2 text-sm">{user.email}</td>
                <td className="py-3 px-2 text-sm">{user.phone}</td>
                <td className="py-3 px-2 text-sm flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
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

        {/* Mobile View */}
        <div className="md:hidden">
          {users.map((user) => (
            <div key={user.id} className="border-b py-4 flex justify-between items-center">
              <div className="flex-1">
                <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline font-semibold">
                  {user.name}
                </Link>
                <p className="text-gray-600">{user.phone}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => { setSelectedUser(user); setShowEditModal(true); }}
                  className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}
                  className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEditModal && (
        <EditUserForm
          user={selectedUser}
          closeModal={() => setShowEditModal(false)}
          onUserUpdated={handleUserUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteUserModal
          user={selectedUser}
          closeModal={() => setShowDeleteModal(false)}
          onUserDeleted={handleUserDelete}
        />
      )}

      {showCreateUserModal && (
        <CreateUserForm
          closeModal={() => setShowCreateUserModal(false)}
          onUserCreated={handleUserCreate} 
        />
      )}
    </div>
  );
};

export default UserList;
