import React, { useState } from 'react';
import { db } from '../../Firebase/FbConfig';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

import { useNavigate } from "react-router-dom";


const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = () => {
    // Custom login logic
    // const dbRef = ref(db);
    const adminUsersRef = ref(db, 'adminUsers');
    const usersQuery = query(adminUsersRef, orderByChild('email'), equalTo(email));

    get(usersQuery)
      .then((snapshot) => {
        const users = snapshot.val();
        if (users) {
          // Check each user for matching password
          const userFound = Object.values(users).some((user) => user.password === password);
          if (userFound) {
            // Login successful
            console.log('Login successful');
            nav('/adminDashboard');
          } else {
            // Incorrect password
            console.log('Incorrect password');
          }
        } else {
          // User not found
          console.log('User not found');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLoginForm;
