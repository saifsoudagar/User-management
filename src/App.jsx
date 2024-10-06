// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import CreateUserForm from './components/CreateUserForm';
import Navbar from './components/Navbar'; // Import the Navbar

const App = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleUserCreated = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Ensure full height for mobile */}
        <Navbar onCreateUser={() => setShowCreateUserModal(true)} /> {/* Integrate Navbar */}
        
        <div className="flex-grow p-4 sm:p-6 lg:p-8"> {/* Add padding based on screen size */}
          <Routes>
            <Route path="/" element={<UserList users={users} />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </div>

        {/* Create User Modal */}
        {showCreateUserModal && (
          <CreateUserForm
            closeModal={() => setShowCreateUserModal(false)}
            onUserCreated={handleUserCreated}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
