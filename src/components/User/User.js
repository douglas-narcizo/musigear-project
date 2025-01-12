import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function User() {
  const { user, logout } = useContext(AuthContext);
//  const navigate = useNavigate();
//  console.log(localStorage.getItem('user'));
    return (
      <>
        {user ? (
          <div>
            <h1>User</h1>
            <h2>Welcome back, {user.firstName} {user.lastName}!</h2>
            <p>ID: {user.id}</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <h2>Please, <Link to="/login">login</Link>!</h2>
        )
      }
      </>
    );
}