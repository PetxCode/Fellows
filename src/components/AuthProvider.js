import React, { useState, useEffect, createContext } from "react";
import { app } from "./../base";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [current, setCurrent] = useState();

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrent(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ current }}>{children}</AuthContext.Provider>
  );
};
