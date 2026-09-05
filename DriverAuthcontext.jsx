import React, { createContext, useContext, useState, useEffect } from "react";

const DriverAuthContext = createContext();

export const DriverAuthProvider = ({ children }) => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const savedDriver = JSON.parse(localStorage.getItem("loggedDriver"));
    if (savedDriver) setDriver(savedDriver);
  }, []);

  const loginDriver = (driverData) => {
    setDriver(driverData);
    localStorage.setItem("loggedDriver", JSON.stringify(driverData));
  };

  const logoutDriver = () => {
    setDriver(null);
    localStorage.removeItem("loggedDriver");
  };

  return (
    <DriverAuthContext.Provider value={{ driver, loginDriver, logoutDriver }}>
      {children}
    </DriverAuthContext.Provider>
  );
};

export const useDriverAuth = () => useContext(DriverAuthContext);
