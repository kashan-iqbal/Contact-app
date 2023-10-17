import { createContext, useContext, useReducer } from "react";
import { ContactReducer } from "./Reducer";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContactReducer, {
    Contacts: null,
  });
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const UserContextuse = () => {
  return useContext(UserContext);
};
