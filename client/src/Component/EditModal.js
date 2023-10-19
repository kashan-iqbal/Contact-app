import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LoadingTime from "../Uitls/Loading";
import axios from "axios";
import { UserContextuse } from "../Context/ContactsContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({closeFunc , data }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(data.name);
  const [email, setEmail] = React.useState(data.email);
  const [phone, setPhone] = React.useState(data.phone);
  const [relation, setRelation] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    console.log(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    closeFunc()

  };
  const { dispatch } = UserContextuse();

  const handleSubmit = async (e, _id) => {
    setLoading(true);
    e.preventDefault();
    const inputVal = {
      name,
      email,
      phone,
      relation,
    };

    const filterData = Object.fromEntries(
      Object.entries(inputVal).filter(([key, value]) => value !== "")
    );

    const token = localStorage.getItem("token");
    const responce = await axios.put(
      `/api/contact/${_id} `,
      filterData,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = responce;

    dispatch({ type: "EDIT_CONTACTS", payload: data });

    setLoading(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
    closeFunc()
  };

  const defaultTheme = createTheme();
  return (
    <>
      <MenuItem sx={{ color: "black"}} onClick={handleClickOpen}>
        Edit
      </MenuItem>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update Contacts
            </Typography>
            {loading ? (
              LoadingTime
            ) : (
              <Button
                autoFocus
                color="inherit"
                onClick={(e) => handleSubmit(e, data._id)}
              >
                save
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      fullWidth
                      label="name"
                      aria-required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      aria-required
                      value={phone}
                      label="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label={!data.email ? "You Not Enter Email" : data.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="relation"
                      label={
                        !data.relation
                          ? "You Not Enter Relation"
                          : data.relation
                      }
                      id="relation"
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Typography
                  variant="p"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                ></Typography>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Dialog>
    </>
  );
}
