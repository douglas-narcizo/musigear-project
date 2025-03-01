import React, { createContext, useState, useEffect } from 'react';
import { userLogin, userLogout, checkLoginStatus, registerUser, loginWithGoogle, loginWithFacebook } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verify user session on app start
  useEffect(() => {
    const verifyUser = async () => {
      const sessionUser = await checkLoginStatus();
      if (sessionUser) {
        if (!sessionUser.picture) {
          sessionUser.picture = `https://api.dicebear.com/9.x/personas/png?seed=${sessionUser.firstName}${sessionUser.lastName}`;
        }
        setUser(sessionUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(sessionUser));
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await userLogin(email, password);
      if (userData) {
        if (!userData.picture) {
          userData.picture = `https://api.dicebear.com/9.x/personas/png?seed=${userData.firstName}${userData.lastName}`;
        }
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const userData = await registerUser(email, password, firstName, lastName);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
      const userData = await loginWithGoogle();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginWithFacebookHandler = async () => {
    try {
      const userData = await loginWithFacebook();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    await userLogout();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register, loginWithGoogleHandler, loginWithFacebookHandler, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};