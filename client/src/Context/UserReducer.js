export const UserReducer = (state, action)=>{
  switch (action.type) {
    case 'CURRENT_USER':{
        return {
            User:action.payload
        };
    }

    default:
      return state;
  }
};
