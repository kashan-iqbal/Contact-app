import {Avatar} from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoadingTime from "../../Uitls/Loading";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
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

export default function Siginup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernamelast, setUsernameLast] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(username,usernamelast,email,phoneNumber,password);
    if (password.length < 8) {
      alert("password must grater then 8 character");
      setLoading(false);
    } else {
      try {
        const {data} = await axios.post("/api/user/register", {
          username,
          usernamelast,
          email,
          phoneNumber,
          password,
        });
        console.log(data, " ia m respnoce");
        if (data.success === true) {
          toast.success("Signup SuccessFully");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          setLoading(false);
        } else {
          toast.error(data.message);
          console.log(data.message, "i am else")
          setLoading(false);
        }
      } catch (data) {
        console.log(data);
        console.log(data.message, "i am catch");
        setLoading(false)
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Avatar sx={{ m: 0.5, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setUsernameLast(e.target.value)}
                    value={usernamelast}
                    aria-required
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Your phone number"
                    name="email"
                    type="number"
                    autoComplete="email"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    aria-required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      aria-required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              {loading ? (
                <LoadingTime />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  sign up
                </Button>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                Already have an account?
                  <NavLink to={"/login"} variant="body2" style={{textDecoration:"none"}}>
                   Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}











// import React, { useState } from "react";
// import { Avatar, Button, Container, CssBaseline, Grid, Link, Box, Typography, createTheme, ThemeProvider, IconButton, InputAdornment, InputLabel, OutlinedInput, FormControl, FormControlLabel } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { NavLink, useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import LoadingTime from "../../Uitls/Loading";

// // Function to handle copyright information
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {"Copyright © "}
//       <Link color="inherit" href="https://kashan-iqbal.netlify.app/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [usernamelast, setUsernameLast] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => event.preventDefault();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       if (password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }

//       const response = await axios.post("/api/user/register", {
//         username,
//         usernamelast,
//         email,
//         phoneNumber,
//         password,
//       });

//       if (response.data.success === true) {
//         toast.success("Signup Successful");
//         setTimeout(() => navigate("/login"), 1000);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box sx={{ marginTop: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
//           <Avatar sx={{ m: 0.5, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               {/* ... (unchanged Grid items) */}
//             </Grid>
//             {loading ? (
//               <LoadingTime />
//             ) : (
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
//                 Sign up
//               </Button>
//             )}
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 Already have an account?{" "}
//                 <NavLink to={"/login"} variant="body2" style={{ textDecoration: "none" }}>
//                   Sign in
//                 </NavLink>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

















