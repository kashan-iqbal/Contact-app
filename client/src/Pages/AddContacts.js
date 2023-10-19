import Button from "@mui/material/Button";
import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Component/Layout";
import LoadingTime from "../Uitls/Loading";
import { UserContextuse } from "../Context/ContactsContext";
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
        Kashan Iqbal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddContacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [loading, setLoading] = useState(false);

  const { dispatch } = UserContextuse();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      name,
      email,
      phone,
      relation,
    };
    if (phone.length !== 11) {
      alert("Number should be 11 digit");
    } else {
      try {
        setLoading(true);
        const responce = await axios.post("/api/contact/", data, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        console.log("Responce", responce);
        if (responce && responce) {
          const { data } = responce;
            dispatch({ type: "Add_Contacts", payload: data });
        
        }
        setName("");
        setEmail("");
        setPhone("");
        setRelation("");
        toast.success("Contact created");
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("some thing weng wrong");
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
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
    
            <Typography component="h1" variant="h5" sx={{ fontWeight: "600" }}>
              Create Contacts
            </Typography>
            <Box component="form"  sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    fullWidth
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    aria-required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                    aria-required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email (optional)"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="relation"
                    label="Relation (optional)"
                    id="relation"
                    onChange={(e) => setRelation(e.target.value)}
                    value={relation}
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
              >
                Name and Number are required
              </Typography>
              {loading ? (
                <LoadingTime />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  New Contact
                </Button>
              )}
            </Box>
          </Box>
          <Copyright sx={{ mt: 15 }} />
        </Container>
    </Layout>
  );
}
