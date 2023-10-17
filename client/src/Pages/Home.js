import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Layout from "../Component/Layout";
import { Box } from "@mui/material";
import { touppercase, network, color } from "../Uitls/Function";
import axios from "axios";
import ListBtn from "../Component/ListBtn";
import { UserContextuse } from "../Context/ContactsContext";

export default function Home() {
  const { Contacts, dispatch } = UserContextuse();

  Contacts && Contacts.sort((a, b) => a.name.localeCompare(b.name));

  // Getting data form backend
  useEffect(() => {
    const getContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const responce = await axios.get("/api/contact/", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const { data } = responce;
        if (data && data) {
          dispatch({ type: "Set_Contacts", payload: data });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getContacts();
  }, [dispatch]);

  return (
    <Layout>
      <Box sx={{ height: "78vh", overflowX: "auto" }}>
        <List
          sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
        >
          {Contacts &&
            Contacts.map((data, idx) => (
              <ListItem alignItems="flex-start" key={idx}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ backgroundColor: `${color()}` }}
                    alt={touppercase(data.name)}
                    src="Photo by Sindre Fs from Pexels: https://www.pexels.com/photo/man-wearing-white-crew-neck-vans-top-and-blue-denim-button-up-jacket-1040881/"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "600" }}>
                      {touppercase(data.name)}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="gray"
                      >
                        {network(data.phone.slice(2, 4))}
                      </Typography>
                    </React.Fragment>
                  }
                />
                {/* list button */}
                <ListBtn key={idx} data={data} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Layout>
  );
}
