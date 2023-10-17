import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { UserContextuse } from "../Context/ContactsContext";
import LoadingTime from "../Uitls/Loading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Dailogbox({ closeFunc, data }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { dispatch } = UserContextuse();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteHandler = async (id) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const responce = await axios.delete(`/api/contact/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = responce;
      dispatch({ type: "Delete_Contact", payload: data });
      closeFunc();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    closeFunc();
  };

  return (
    <>
      {" "}
      <MenuItem sx={{ ml: "-30" }} onClick={handleClickOpen}>
        Delete
      </MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Want To Sure Delete This contacts
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingTime />
          ) : (
            <Button onClick={() => deleteHandler(data._id)}>Yes</Button>
          )}
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
