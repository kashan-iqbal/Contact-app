import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import { UserContextuse } from "../Context/ContactsContext";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://kashan-iqbal.netlify.app/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Profilepage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const { Contacts, favContacts } = UserContextuse();
  const { User, dispatch } = useUserContext();
  const ContactsLenght = Contacts && Contacts.length;
  const FavContactsLenght = favContacts && favContacts.length;

  const getUserData = async () => {
    let token = localStorage.getItem("token");
    const { data } = await axios.get(`api/user/current`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (data && data) {
      dispatch({ type: "CURRENT_USER", payload: data });
    }
  };

  getUserData();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Link onClick={handleBack}>
          <ArrowBackIcon
            sx={{
              marginTop: 4,
            }}
          />
        </Link>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={User && User.username}
                  focused
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  label="Last Name"
                  value={User && User.usernamelast}
                  inputProps={{
                    readOnly: true,
                  }}
                  focused
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="E-mail"
                  autoComplete="email"
                  value={User && User.email}
                  inputProps={{
                    readOnly: true,
                  }}
                  color="info"
                  focused
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="number"
                  id="password"
                  label="Phone Number"
                  autoComplete="new-password"
                  value={User && User.phoneNumber}
                  inputProps={{
                    readOnly: true,
                  }}
                  focused
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="number"
                  id="password"
                  label="Total Contacts"
                  autoComplete="new-password"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={ContactsLenght}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="number"
                  id="password"
                  label="Favorits Contacts"
                  autoComplete="new-password"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={FavContactsLenght}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 12 }} />
      </Container>
    </ThemeProvider>
  );
}
