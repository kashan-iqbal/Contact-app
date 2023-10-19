import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Layout from "../Component/Layout";
import { Box, Skeleton } from "@mui/material";
import { touppercase, network, color } from "../Uitls/Function";
import axios from "axios";
import ListBtn from "../Component/ListBtn";
import { UserContextuse } from "../Context/ContactsContext";

export default function Home() {
  const { Contacts, dispatch } = UserContextuse();

  if (Contacts) {
    Contacts.sort((a, b) => a.name.localeCompare(b.name));
  }
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
          {Contacts?.map((data, idx) => (
            <ListItem alignItems="flex-start" key={idx}>
              <ListItemAvatar>
                {data ? (
                  <Avatar
                    sx={{ backgroundColor: `${color()}` }}
                    alt={touppercase(data.name)}
                    src=""
                  />
                ) : (
                  <Skeleton variant="circular" width={40} height={40} />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "600" }}>
                    {touppercase(data && data.name)}
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
                      {network(data && data.phone.slice(2, 4))}
                    </Typography>
                  </React.Fragment>
                }
              />

              <ListBtn key={idx} data={data} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
}
