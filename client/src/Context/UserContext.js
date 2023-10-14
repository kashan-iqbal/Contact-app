import React, { createContext, useState } from "react";

export const UserContext = createContext();


const UserContextProvider = ({ children }) => {
    const [userData,setUserData]=useState({})
  return (
    <div>
      <UserContext.Provider value={{userData,setUserData}}>{children}</UserContext.Provider>
    </div>
  );
};

export default UserContextProvider;
