export const ContactReducer = (state, action) => {
  switch (action.type) {
    case "Set_Contacts": {
      return {
        ...state,
        Contacts: action.payload,
      };
    }
    // case "Add_Contacts": {
    //   return {
    //     Contacts: [action.payload, state.Contacts],
    //   };
    // }
    case "Delete_Contact": {
      return {
        ...state,
        Contacts: state.Contacts.filter((c) => c._id !== action.payload._id),
      };
    }
    case "EDIT_CONTACTS": {
      return {
        ...state,
        Contacts: state.Contacts.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    }
    case "FAVORITE_CONTACTS":
      return {
        ...state,
        favContacts: [...state.favContacts, action.payload],
      };
      case "REMOVE_FAVCONTACTS":
        return{
          ...state,
          favContacts: state.favContacts.filter((c)=> c._id !== action.payload)
        }
    default:
      return state;
  }
};
