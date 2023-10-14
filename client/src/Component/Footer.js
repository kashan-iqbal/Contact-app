import {
  BottomNavigationAction,
  BottomNavigation,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const sty = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <>
      <Box>
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
          <Divider />

          <BottomNavigation showLabel sx={{display:"flex",justifyContent:"space-around",alignItems:"center"}} >
            <Link style={sty} to={"/Favorite"}>
              <BottomNavigationAction
                showLabel
                label="Favorits"
                icon={<StarBorderPurple500OutlinedIcon />}
              />
            </Link>

            <Link style={sty} to={"/Home"}>
              <BottomNavigationAction
                showLabel
                label="All Contacts"
                icon={<PersonOutlineOutlinedIcon />}
              />
            </Link>
            <Link style={sty} to={"/Add-Contacts"}>
              <BottomNavigationAction
                showLabel
                label="Add Contacts"
                icon={<AddOutlinedIcon />}
              />
            </Link>
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
};

export default Footer;
