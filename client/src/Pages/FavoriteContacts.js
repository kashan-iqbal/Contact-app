import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Layout from "../Component/Layout";
import { Box } from "@mui/material";
import {data,network,touppercase,color} from "../Uitls/Function"
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';


const FavoriteContacts = () => {
  return (
    <Layout>
            <Box sx={{ height: "78vh", overflowX: "auto" }}>
        <List
          sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
        >
          {data.map((data, idx) => (
            <ListItem alignItems="flex-start" key={idx}>
              <ListItemAvatar>
                <Avatar
                  sx={{backgroundColor:`${color()}`}}
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
                      {network(data.number.slice(2, 4))}
                    </Typography>
                  </React.Fragment>
                }
              />
         <PersonRemoveAlt1Icon sx={{color:"gray"}}/>
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  )
}

export default FavoriteContacts