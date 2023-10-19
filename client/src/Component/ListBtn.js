import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dailogbox from "./DailogBox";
import FullScreenDialog from "./EditModal";
import { UserContextuse } from "../Context/ContactsContext";
import { styled } from '@mui/material/styles';

const ITEM_HEIGHT = 48;

export default function ListBtn({ data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { dispatch, favContacts } = UserContextuse();

  const AddTofavorite = (e, data) => {
    e.preventDefault();
    if (data && data) {
      const alreaduInFav = favContacts.some((ele) => ele._id === data._id);
      if (alreaduInFav) {
        alert("Already in favorite");
        handleClose();
      } else {
        dispatch({ type: "FAVORITE_CONTACTS", payload: data });
        console.log(data);
        handleClose();
      }
    }
  };


  
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <FullScreenDialog  closeFunc={handleClose} data={data} />
        <Dailogbox closeFunc={handleClose} data={data} />
        <MenuItem onClick={(e) => AddTofavorite(e, data)}>Favorite</MenuItem>
      </Menu>
    </div>
  );
}
