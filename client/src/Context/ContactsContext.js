import { createContext, useContext, useReducer } from "react";
import { ContactReducer } from "./Reducer";

const UserContext = createContext();

const ContactContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContactReducer, {
    Contacts: null,
    favContacts:[]
  });
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContactContextProvider;

export const UserContextuse = () => {
  return useContext(UserContext);
};
