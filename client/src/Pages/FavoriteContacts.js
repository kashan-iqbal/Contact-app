import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Layout from "../Component/Layout";
import { Box, Button } from "@mui/material";
import { network, touppercase, color } from "../Uitls/Function";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { UserContextuse } from "../Context/ContactsContext";

const FavoriteContacts = () => {
  const { dispatch, favContacts } = UserContextuse();

  const removeFav = (id) => {
    dispatch({ type: "REMOVE_FAVCONTACTS", payload: id });
    console.log(` iam working`);
  };
  return (
    <Layout>
      <Box sx={{ height: "78vh", overflowX: "auto" }}>
        <List
          sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
        >
          {favContacts &&
            favContacts.map((data, idx) => (
              <ListItem alignItems="flex-start" key={idx}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ backgroundColor: `${color()}` }}
                    alt={touppercase(data.name)}
                    src=""
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
                <Button onClick={(e) => removeFav(data._id)}>
                  <PersonRemoveAlt1Icon sx={{ color: "gray" }} />
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </Layout>
  );
};

export default FavoriteContacts;
