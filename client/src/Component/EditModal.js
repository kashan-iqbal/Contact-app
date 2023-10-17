import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
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
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LoadingTime from "../Uitls/Loading";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ data }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [relation, setRelation] = React.useState("");

  const handleClickOpen = () => {
    console.log(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e, _id) => {
    e.preventDefault();
    const data ={
      name,
      email,
      phone,
      relation,
    }


    const token = localStorage.getItem("token");
    const responce = await axios.patch(
      `/api/contact/${_id} `,data,
    
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log(responce);
    console.log(email, name, phone, relation);
  };

  const defaultTheme = createTheme();
  return (
    <div>
      <Button sx={{ color: "black" }} onClick={handleClickOpen}>
        Edit
      </Button>
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <ThemeProvider theme={defaultTheme}>
          <Container
            component="main"
            onSubmit={(e) => handleSubmit(e, data._id)}
            maxWidth="xs"
          >
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
                      label={data.name}
                      aria-required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label={data.phone}
                      aria-required
                      value={phone}
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
                {/* {loading ? ( */}
                {/* <LoadingTime /> */}
                {/* ) : ( */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update Contact
                </Button>
                {/* )} */}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}
