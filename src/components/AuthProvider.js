import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, cart, setCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
