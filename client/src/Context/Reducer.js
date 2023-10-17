export const ContactReducer = (state, action) => {
  switch (action.type) {
    case "Set_Contacts": {
      return {
        Contacts: action.payload,
      };
    } 
    case "Add_Contacts": {
      return {
        Contacts: [action.payload , state.Contacts],
      };
    }
    case "Delete_Contact": {
      return {
        Contacts: state.Contacts.filter((c) =>c._id !== action.payload._id)
      };
    }
    default:
      return state;
  }
};
