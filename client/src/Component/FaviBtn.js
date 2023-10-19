import React from "react";
import { ButtonBase } from "@mui/material";
import { UserContextuse } from "../Context/ContactsContext";

const FaviBtn = ({ closeFunc, data }) => {
  const { dispatch } = UserContextuse();

  const AddTofavorite = (e, data) => {
    e.preventDefault();
    if (data && data) {
      dispatch({ type: "FAVORITE_CONTACTS", payload: data });
      console.log(data);
    }
  };

  return (
    <ButtonBase onClick={(e) => AddTofavorite(e, data)}>FaviBtn</ButtonBase>
  );
};

export default FaviBtn;
